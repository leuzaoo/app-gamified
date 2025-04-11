import pool from "../config/db.js";

await pool.query(`
  CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    workout_type VARCHAR(20) NOT NULL CHECK (workout_type IN ('academia', 'casa/rua')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`);

console.log("Workouts table created successfully");

await pool.end();
console.log("Database connection closed after created workout table");
process.exit();
