import pool from "../config/db.js";

await pool.query(
  `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(20) UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
);

console.log("Users table created successfully");

await pool.end();
console.log("Database connection closed after created users table");
process.exit();
