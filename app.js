import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
import languageRoutes from './routes/languageRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';



dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/language', languageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
