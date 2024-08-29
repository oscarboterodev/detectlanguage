import pool from '../config/db.js';

const saveCost = async (userId, language, textLength, costPerCharacter, totalCost) => {
    await pool.query(
        `INSERT INTO costs (user_id, language, text_length, cost_per_character, total_cost, created_at) 
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [userId, language, textLength, costPerCharacter, totalCost]
    );
};

const getGlobalCostPerCharacter = async () => {
    const result = await pool.query('SELECT cost_per_character FROM global_cost LIMIT 1');
    return result.rows[0]?.cost_per_character;
};

export { saveCost, getGlobalCostPerCharacter };
