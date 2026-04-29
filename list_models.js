import 'dotenv/config';

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.VITE_GEMINI_API_KEY}`);
    const data = await response.json();
    console.log(JSON.stringify(data.models.filter(m => m.supportedGenerationMethods.includes('generateContent')).map(m => m.name), null, 2));
  } catch (e) {
    console.error(e);
  }
}
listModels();
