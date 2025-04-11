import pool from "./../config/db.js";

export default async function setWorkoutController(req, res) {
  const { workout_type } = req.body;
  const userId = req.userId;

  if (!workout_type || !["academia", "casa/rua"].includes(workout_type)) {
    return res.status(400).json({ message: "Tipo de treino inválido." });
  }

  try {
    const existingWorkout = await pool.query(
      "SELECT id FROM workouts WHERE user_id = $1",
      [userId]
    );

    let workoutResult;
    if (existingWorkout.rows.length > 0) {
      workoutResult = await pool.query(
        "UPDATE workouts SET workout_type = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *",
        [workout_type, userId]
      );
    } else {
      workoutResult = await pool.query(
        "INSERT INTO workouts (user_id, workout_type) VALUES ($1, $2) RETURNING *",
        [userId, workout_type]
      );
    }

    const userResult = await pool.query(
      "UPDATE users SET workout_type = $1 WHERE id = $2 RETURNING *",
      [workout_type, userId]
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
