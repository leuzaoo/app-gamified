import pool from "../../config/db.js";

export default async function setWorkoutController(req, res) {
  const { workout_type, training_experience } = req.body;
  const userId = req.userId;

  if (!workout_type || !["academia", "casa/rua"].includes(workout_type)) {
    return res.status(400).json({ message: "Tipo de treino inválido." });
  }

  if (
    !training_experience ||
    !["beginner", "regular", "advanced"].includes(training_experience)
  ) {
    return res.status(400).json({ message: "Experiência de treino inválida." });
  }

  try {
    const existingWorkout = await pool.query(
      "SELECT id FROM workouts WHERE user_id = $1",
      [userId]
    );

    let workoutResult;
    if (existingWorkout.rows.length > 0) {
      workoutResult = await pool.query(
        "UPDATE workouts SET workout_type = $1, training_experience = $2, updated_at = NOW() WHERE user_id = $3 RETURNING *",
        [workout_type, training_experience, userId]
      );
    } else {
      workoutResult = await pool.query(
        "INSERT INTO workouts (user_id, workout_type, training_experience) VALUES ($1, $2, $3) RETURNING *",
        [userId, workout_type, training_experience]
      );
    }

    const userResult = await pool.query(
      "UPDATE users SET workout_type = $1, training_experience = $2 WHERE id = $3 RETURNING *",
      [workout_type, training_experience, userId]
    );

    res.status(200).json({
      workout: workoutResult.rows[0],
      user: userResult.rows[0],
    });
  } catch (error) {
    console.error("Error in setWorkoutController:", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}

export async function completeWorkoutController(req, res) {
  const { pushUps, squats, sitUps, runningDistance } = req.body;
  const userId = req.userId;

  try {
    const goalsRes = await pool.query(
      `
      SELECT wg.pushups_goal, wg.squats_goal, wg.situps_goal, wg.running_goal
      FROM workout_goals wg
      JOIN workouts w ON w.training_experience = wg.training_experience
      WHERE w.user_id = $1
      `,
      [userId]
    );

    if (goalsRes.rows.length === 0) {
      return res.status(400).json({
        message: "Objetivos de treino não encontrados para este usuário.",
      });
    }

    const { pushups_goal, squats_goal, situps_goal, running_goal } =
      goalsRes.rows[0];

    const strengthPoints = Math.min(
      (pushUps / pushups_goal + squats / squats_goal + sitUps / situps_goal) *
        (8 / 3),
      16
    );

    const agilityPoints = Math.min((runningDistance / running_goal) * 4, 8);

    const strengthPointsInt = Math.floor(strengthPoints);
    const agilityPointsInt = Math.floor(agilityPoints);
    const totalXP = strengthPointsInt + agilityPointsInt;

    const updateUserQuery = `
      UPDATE users 
      SET 
        attributes = jsonb_set(
          jsonb_set(attributes, '{strength}', to_jsonb(((attributes->>'strength')::int + $1)), false),
          '{agility}', to_jsonb(((attributes->>'agility')::int + $2)), false
        ),
        xp = xp + $3
      WHERE id = $4
      RETURNING id, attributes, xp;
    `;

    const userResult = await pool.query(updateUserQuery, [
      strengthPointsInt,
      agilityPointsInt,
      totalXP,
      userId,
    ]);

    const insertRecordQuery = `
      INSERT INTO daily_workout_records (user_id, pushups, squats, situps, running_distance)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id, record_date) DO UPDATE
      SET pushups = daily_workout_records.pushups + EXCLUDED.pushups,
          squats = daily_workout_records.squats + EXCLUDED.squats,
          situps = daily_workout_records.situps + EXCLUDED.situps,
          running_distance = daily_workout_records.running_distance + EXCLUDED.running_distance,
          updated_at = NOW()
      RETURNING *;
    `;

    const recordResult = await pool.query(insertRecordQuery, [
      userId,
      pushUps,
      squats,
      sitUps,
      runningDistance,
    ]);

    res.status(200).json({
      message: "Treino registrado com sucesso! Página será recarregada.",
      updatedStats: userResult.rows[0],
      dailyRecord: recordResult.rows[0],
    });
  } catch (error) {
    console.error("Error trying to register workout: ", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
