import pool from "../config/db.js";

export default async function setUsername(req, res) {
  const { username } = req.body;

  try {
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Nome de usuário inválido." });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Jogador já existe, escolha outro." });
    }

    const updatedUser = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING id, email, username",
      [username, req.userId]
    );

    res.json({ user: updatedUser.rows[0] });
  } catch (error) {
    console.error("Error updating username: ", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
