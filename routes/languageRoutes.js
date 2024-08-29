import express from 'express';
import { detectAndSaveLanguage } from '../controllers/languageController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/detect', authenticateToken, detectAndSaveLanguage);

export default router;