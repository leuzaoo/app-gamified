import pool from "../../config/db.js";

function getDate12MonthsAgo() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().substring(0, 10);
}

export async function createWorkoutController(req, res) {
  const userId = req.userId;
  const { name } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: "Insira um nome para seu treino." });
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO custom_workouts (user_id, name)
        VALUES($1, $2)
        RETURNING id, user_id, name, created_at
      `,
      [userId, name.trim()]
    );

    const workout = result.rows[0];
    return res.status(201).json({ workout });
  } catch (error) {
    console.error("Error creating workout: ", error);
    return res.status(500).json({ message: "Erro interno ao criar treino." });
  }
}

export async function addExerciseController(req, res) {
  const userId = req.userId;
  const workoutId = Number(req.params.id);
  const { name, metric_type, attribute, goal_value } = req.body;

  if (isNaN(workoutId)) {
    return res.status(400).json({ message: "ID de treino inválido." });
  }
  if (!name || !metric_type || !attribute || goal_value == null) {
    return res.status(400).json({ message: "Dados do exercício incompletos." });
  }
  if (!["reps", "distance"].includes(metric_type)) {
    return res.status(400).json({ message: "metric_type inválido." });
  }
  if (
    !["strength", "agility", "vitality", "intelligence"].includes(attribute)
  ) {
    return res.status(400).json({ message: "attribute inválido." });
  }
  const goalNum = Number(goal_value);
  if (isNaN(goalNum) || goalNum <= 0) {
    return res
      .status(400)
      .json({ message: "goal_value deve ser um número positivo." });
  }

  try {
    const workoutRes = await pool.query(
      `SELECT id FROM custom_workouts WHERE id = $1 AND user_id = $2`,
      [workoutId, userId]
    );
    if (workoutRes.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Treino não encontrado ou sem permissão." });
    }

    await pool.query(
      `
      INSERT INTO custom_exercises
        (workout_id, name, metric_type, attribute, goal_value)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [workoutId, name.trim(), metric_type, attribute, goalNum]
    );

    const exercisesRes = await pool.query(
      `
      SELECT id, name, metric_type, attribute, goal_value, created_at
      FROM custom_exercises
      WHERE workout_id = $1
      ORDER BY created_at ASC
      `,
      [workoutId]
    );

    return res.status(201).json({ exercises: exercisesRes.rows });
  } catch (error) {
    console.error("Error adding exercise:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao adicionar exercício." });
  }
}

export async function listWorkoutsController(req, res) {
  const userId = req.userId;

  try {
    const result = await pool.query(
      `
        SELECT
          id,
          name,
          created_at
        FROM custom_workouts
        WHERE user_id = $1
        ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({ workouts: result.rows });
  } catch (error) {
    console.error("Error listing workouts:", error);
    return res.status(500).json({ message: "Erro interno ao listar treinos." });
  }
}

export async function setWorkoutController(req, res) {
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

export async function getCustomWorkoutController(req, res) {
  const userId = req.userId;
  const workoutId = Number(req.params.id);

  if (isNaN(workoutId)) {
    return res.status(400).json({ message: "ID de treino inválido." });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        cw.id,
        cw.name,
        cw.created_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ce.id,
              'name', ce.name,
              'metric_type', ce.metric_type,
              'attribute', ce.attribute,
              'goal_value', ce.goal_value,
              'created_at', ce.created_at
            )
          ) FILTER (WHERE ce.id IS NOT NULL),
          '[]'
        ) AS exercises
      FROM custom_workouts cw
      LEFT JOIN custom_exercises ce
        ON ce.workout_id = cw.id
      WHERE cw.id = $1
        AND cw.user_id = $2
      GROUP BY cw.id, cw.name, cw.created_at;
      `,
      [workoutId, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Treino não encontrado ou sem permissão." });
    }

    const workout = result.rows[0];
    return res.status(200).json({ workout });
  } catch (error) {
    console.error("Error fetching workout:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao buscar o treino." });
  }
}

export async function completeWorkoutController(req, res) {
  const { pushups, squats, situps, runningDistance } = req.body;
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

    if (pushups > 2 * pushups_goal) {
      return res.status(400).json({
        message: `Não é possível registrar mais que o dobro da meta de flexões (seu caso é: ${
          2 * pushups_goal
        }).`,
      });
    }
    if (squats > 2 * squats_goal) {
      return res.status(400).json({
        message: `Não é possível registrar mais que o dobro da meta de agachamentos (seu caso é: ${
          2 * squats_goal
        }).`,
      });
    }
    if (situps > 2 * situps_goal) {
      return res.status(400).json({
        message: `Não é possível registrar mais que o dobro da meta de abdominais (seu caso é: ${
          2 * situps_goal
        }).`,
      });
    }
    if (runningDistance > 2 * running_goal) {
      return res.status(400).json({
        message: `Não é possível registrar mais que o dobro da meta de corrida (seu caso é: ${
          2 * running_goal
        } km).`,
      });
    }

    const strengthPoints = Math.min(
      (pushups / pushups_goal + squats / squats_goal + situps / situps_goal) *
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
      SET pushups = CASE 
                      WHEN daily_workout_records.pushups + EXCLUDED.pushups > $6 
                      THEN $6 
                      ELSE daily_workout_records.pushups + EXCLUDED.pushups 
                    END,
          squats = CASE 
                     WHEN daily_workout_records.squats + EXCLUDED.squats > $7 
                     THEN $7 
                     ELSE daily_workout_records.squats + EXCLUDED.squats 
                   END,
          situps = CASE 
                     WHEN daily_workout_records.situps + EXCLUDED.situps > $8 
                     THEN $8 
                     ELSE daily_workout_records.situps + EXCLUDED.situps 
                   END,
          running_distance = CASE 
                               WHEN daily_workout_records.running_distance + EXCLUDED.running_distance > $9 
                               THEN $9 
                               ELSE daily_workout_records.running_distance + EXCLUDED.running_distance 
                             END,
          updated_at = NOW()
      RETURNING *;
    `;

    const recordResult = await pool.query(insertRecordQuery, [
      userId,
      pushups,
      squats,
      situps,
      runningDistance,
      2 * pushups_goal,
      2 * squats_goal,
      2 * situps_goal,
      2 * running_goal,
    ]);

    res.status(200).json({
      message: "Treino registrado com sucesso!",
      updatedStats: userResult.rows[0],
      dailyRecord: recordResult.rows[0],
    });
  } catch (error) {
    console.error("Error trying to register workout: ", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}

export async function getWorkoutHistoryController(req, res) {
  const userId = req.userId;

  const { start, end } = req.query;

  const endDate = end || new Date().toISOString().substring(0, 10);
  const startDate = start || getDate12MonthsAgo();

  try {
    const result = await pool.query(
      `
      SELECT  record_date,
              pushups,
              squats,
              situps,
              running_distance
      FROM daily_workout_records
      WHERE user_id = $1
      AND record_date BETWEEN $2 AND $3
      ORDER BY record_date ASC;
      `,
      [userId, startDate, endDate]
    );

    res.status(200).json({ history: result.rows });
  } catch (error) {
    console.error("Erro ao obter histórico de treino:", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
