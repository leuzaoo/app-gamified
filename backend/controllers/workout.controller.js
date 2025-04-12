import pool from "../config/db.js";

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

  const goalPushUps = 20;
  const goalSquats = 20;
  const goalSitUps = 20;
  const goalRunning = 2;

  const strengthPoints = Math.min(
    (pushUps / goalPushUps + squats / goalSquats + sitUps / goalSitUps) * 10,
    30
  );

  const agilityPoints = Math.min((runningDistance / goalRunning) * 10, 10);

  const strengthPointsInt = Math.floor(strengthPoints);
  const agilityPointsInt = Math.floor(agilityPoints);

  try {
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
    const totalXP = strengthPointsInt + agilityPointsInt;

    const userResult = await pool.query(updateUserQuery, [
      strengthPointsInt,
      agilityPointsInt,
      totalXP,
      userId,
    ]);

    res.status(200).json({
      message: "Treino registrado com sucesso!",
      updatedStats: userResult.rows[0],
    });
  } catch (error) {
    console.error("Error trying to register workout: ", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
