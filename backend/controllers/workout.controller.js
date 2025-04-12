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
