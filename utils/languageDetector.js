import cld from 'cld';

const detectLanguage = async (text) => {
    try {
        const result = await cld.detect(text);
        return result.languages[0].name;
    } catch (error) {
        console.error('Error detecting language:', error);
        return 'unknown';
    }
};

export default detectLanguage;