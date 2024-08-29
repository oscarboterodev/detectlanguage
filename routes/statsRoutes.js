import express from 'express';
import { getDetectionStats } from '../controllers/statsController.js';

const router = express.Router();

router.get('/:userId', getDetectionStats);

export default router;
