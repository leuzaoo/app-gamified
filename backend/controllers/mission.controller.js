import pool from "../config/db.js";

export default async function completedMissionController(req, res) {
  const { xpEarned } = req.body;
  const userId = req.userId;

  if (!xpEarned || xpEarned < 0) {
    return res.status(400).json({ message: "XP Inválido." });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET xp = xp + $1 WHERE id = $2 RETURNING xp",
      [xpEarned, userId]
    );
    res.status(200).json({ xp: result.rows[0].xp });
  } catch (error) {
    console.error("Erro ao atualizar XP: ", error);
    res
      .status(500)
      .json({ message: "Erro no servidor interno ao atualizar o XP." });
  }
}
