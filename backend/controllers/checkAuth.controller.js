import pool from "../config/db.js";

export async function checkAuthController(req, res) {
  try {
    if (!req.userId) {
      return res.status(404).json({
        message: "ID de usuário inválido. Faça login novamente.",
      });
    }

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuário não encontrado. Faça login novamente.",
      });
    }

    const user = result.rows[0];

    res.status(200).json({
      user: { ...user, password: null },
    });
  } catch (error) {
    console.error("Erro no controlador checkAuth: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
}
