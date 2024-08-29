import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
import languageRoutes from './routes/languageRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/language', languageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
