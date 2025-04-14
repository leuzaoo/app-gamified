import pool from "../config/db.js";

await pool.query(
  `
    CREATE TABLE daily_workout_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        record_date DATE NOT NULL DEFAULT CURRENT_DATE,
        flexoes INTEGER DEFAULT 0,
        agachamentos INTEGER DEFAULT 0,
        abdominais INTEGER DEFAULT 0,
        corrida FLOAT DEFAULT 0,s
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, record_date)
    );
  `
);

console.log("Daily workout table created successfully");

await pool.end();
console.log("Database connection closed after created daily workout table");
process.exit();
