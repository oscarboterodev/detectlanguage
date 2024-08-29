import pool from '../config/db.js';

const createUser = async (username, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
    );
    return result.rows[0].id;
};

const getUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

export { createUser, getUserByUsername };
