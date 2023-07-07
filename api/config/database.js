import mysql from "mysql2";

// Create a database connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "HobaPro",
    password: "HobaPro_123",
    database: "mydb",
});

/*CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    verified BOOL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

export default pool;