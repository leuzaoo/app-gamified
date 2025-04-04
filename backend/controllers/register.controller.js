import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function registerController(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Já existe uma conta associada a este email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(201).json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("Error in register controller: ", error);
    res.status(500).json({ message: "Erro no servidor interno." });
  }
}
