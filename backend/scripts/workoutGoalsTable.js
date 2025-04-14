import pool from "../config/db.js";

await pool.query(`
 CREATE TABLE workout_goals (
    id SERIAL PRIMARY KEY,
    training_experience VARCHAR(50) NOT NULL 
    CHECK (training_experience IN ('beginner', 'regular', 'advanced')),
    pushups_goal INTEGER NOT NULL,
    squats_goal INTEGER NOT NULL,
    situps_goal INTEGER NOT NULL,
    running_goal FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
`);

console.log("Workout goals table has created successfully");

await pool.end();
console.log("Database connection closed after created workout goals table");
process.exit();
