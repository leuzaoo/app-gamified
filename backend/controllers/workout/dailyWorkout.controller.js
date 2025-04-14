import pool from "../../config/db.js";

export async function getDailyWorkoutController(req, res) {
  const userId = req.userId;

  try {
    const result = await pool.query(
      `SELECT pushups, squats, situps, running_distance
       FROM daily_workout_records
       WHERE user_id = $1 AND record_date = CURRENT_DATE`,
      [userId]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ record: result.rows[0] });
    } else {
      res.status(200).json({
        record: { flexoes: 0, agachamentos: 0, abdominais: 0, corrida: 0 },
      });
    }
  } catch (error) {
    console.error("Erro no controller getDailyWorkout: ", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
