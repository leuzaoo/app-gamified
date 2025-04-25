import pool from "../config/db.js";

await pool.query(
  `
    CREATE TABLE custom_workouts(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
);

await pool.query(
  `
  CREATE TABLE custom_exercises (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER REFERENCES custom_workouts(id) on DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    metric_type VARCHAR(10) NOT NULL CHECK (metric_type IN ('reps', 'distance')),
    attribute VARCHAR(20) NOT NULL CHECK (attribute IN ('strength','agility','vitality','intelligence')),
    goal_value FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
  `
);

console.log("Custom workouts table created successfully");

await pool.end();
console.log("Database connection closed after created custom workout table");
process.exit();
