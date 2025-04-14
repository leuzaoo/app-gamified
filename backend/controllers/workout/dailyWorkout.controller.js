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

export async function getDailyGoalsController(req, res) {
  const userId = req.userId;

  try {
    const query = `
      SELECT w.training_experience, 
             wg.pushups_goal, 
             wg.squats_goal, 
             wg.situps_goal, 
             wg.running_goal
      FROM workouts w
      JOIN workout_goals wg 
           ON w.training_experience = wg.training_experience
      WHERE w.user_id = $1;
    `;
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum objetivo encontrado para o usuário." });
    }

    res.status(200).json({ goals: result.rows[0] });
  } catch (error) {
    console.error("Erro ao buscar os goals de treino:", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
