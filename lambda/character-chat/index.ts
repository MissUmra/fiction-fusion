exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const body = JSON.parse(event.body || '{}');
    const {
      characterName,
      characterSource,
      userMessage,
      mood,
      additionalInfo,
      conversationHistory = []
    } = body;

    if (!characterName || !characterSource || !userMessage) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing required fields" }) };
    }
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Gemini API key not configured" }) };
    }

    const characterContext = `You are ${characterName} from ${characterSource}. ${additionalInfo || ''}

CRITICAL INSTRUCTIONS:
- You must ONLY respond as ${characterName} would respond
- Stay completely in character at all times
- Use ${characterName}'s personality, speech patterns, vocabulary, and mannerisms
- Reference events, relationships, and knowledge from ${characterSource}
- Respond in a ${mood} tone while maintaining character authenticity
- Keep responses conversational and engaging (2-4 sentences)
- Include character actions in *asterisks* when appropriate
- Never break character or mention that you are an AI
- Show emotional depth appropriate to ${characterName}

Character Background: ${characterName} is from ${characterSource}. ${additionalInfo || 'Use your knowledge of this character to respond authentically.'}

Current conversation mood: ${mood}`;

    let conversationContext = '';
    if (conversationHistory.length > 0) {
      conversationContext = '\n\nRecent conversation:\n';
      const recentHistory = conversationHistory.slice(-6);
      for (const msg of recentHistory) {
        conversationContext += `${msg.role === 'user' ? 'User' : characterName}: ${msg.content}\n`;
      }
    }

    const fullPrompt = `${characterContext}${conversationContext}

User: ${userMessage}
${characterName}:`;

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Failed to generate response from Gemini API", details: errorData }) };
    }

    const geminiData = await geminiResponse.json();
    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "No response generated from Gemini API" }) };
    }

    const generatedText = geminiData.candidates[0].content.parts[0].text.trim();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: generatedText,
        characterName,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Character chat error", details: error.message }) };
  }
};