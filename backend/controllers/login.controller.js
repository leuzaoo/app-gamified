import bcrypt from "bcrypt";

import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";
import pool from "../config/db.js";

export async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Usuário não existe." });
    }
    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const token = generateTokenAndSetCookies(user.id, res);

    res.status(200).json({
      user: { ...user, password: null },
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
