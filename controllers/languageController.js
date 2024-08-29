import { saveCost, getGlobalCostPerCharacter } from '../models/Cost.js';  // Asegúrate de incluir la extensión .js
import detectLanguage from '../utils/languageDetector.js';  // Asegúrate de incluir la extensión .js

export const detectAndSaveLanguage = async (req, res) => {
    const { text } = req.body;
    const detectedLanguage = await detectLanguage(text);
    const textLength = text.length;

    try {
        const costPerCharacter = await getGlobalCostPerCharacter();

        if (!costPerCharacter) {
            return res.status(500).json({ error: 'Global cost per character not defined' });
        }

        const totalCost = (textLength * costPerCharacter);

        await saveCost(req.user.id, detectedLanguage, textLength, costPerCharacter, totalCost);
        res.json({ language: detectedLanguage, totalCost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
