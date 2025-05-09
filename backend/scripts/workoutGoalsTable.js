import pool from "../config/db.js";

async function createWorkoutGoalsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS workout_goals (
        id SERIAL PRIMARY KEY,
        training_experience VARCHAR(50) NOT NULL
          CHECK (training_experience IN ('beginner', 'regular', 'advanced')),
        pushups_goal INTEGER NOT NULL,
        squats_goal INTEGER NOT NULL,
        situps_goal INTEGER NOT NULL,
        running_goal FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(training_experience)
      );
    `);
    console.log("Workout goals table created successfully");

    await pool.query(`
      INSERT INTO workout_goals (
        training_experience,
        pushups_goal,
        squats_goal,
        situps_goal,
        running_goal
      ) VALUES
        ('beginner', 20, 20, 20, 2),
        ('regular',  30, 30, 30, 3),
        ('advanced', 40, 40, 40, 4)
      ON CONFLICT (training_experience) DO NOTHING;
    `);
    console.log("Default workout goals inserted successfully");
  } catch (err) {
    console.error(
      "Error creating workout_goals table or inserting defaults:",
      err
    );
  } finally {
    await pool.end();
    console.log("Database connection closed after workout_goals setup");
    process.exit(0);
  }
}

createWorkoutGoalsTable();
