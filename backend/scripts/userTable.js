import pool from "../config/db.js";

await pool.query(
  `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(20) UNIQUE,
      password VARCHAR(255) NOT NULL,
      xp INTEGER DEFAULT 0,
      attributes JSONB DEFAULT '{"strength": 0, "vitality": 0, "intelligence": 0, "agility": 0}',
      workout_type VARCHAR(20),
      training_experience VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
);

console.log("Users table created successfully");

await pool.end();
console.log("Database connection closed after created users table");
process.exit();
