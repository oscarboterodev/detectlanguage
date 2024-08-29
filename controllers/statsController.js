import pool from '../config/db.js';

export const getDetectionStats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await pool.query(
            'SELECT COUNT(*) AS total_detections, SUM(total_cost) AS total_cost FROM costs WHERE user_id = $1',
            [userId]
        );

        const stats = result.rows[0];
        res.json(stats);
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
