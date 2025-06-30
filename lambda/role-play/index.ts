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
      aiCharacterName,
      aiCharacterSource,
      userCharacterName,
      userCharacterSource,
      sceneDescription,
      userMessage,
      mood,
      conversationHistory = []
    } = body;

    if (!aiCharacterName || !aiCharacterSource || !userCharacterName || !sceneDescription || !userMessage) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing required fields" }) };
    }
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Gemini API key not configured" }) };
    }

    const rolePlayContext = `ROLE-PLAY SCENARIO:

You are ${aiCharacterName} from ${aiCharacterSource} in an interactive role-playing scenario.

SCENE SETTING: ${sceneDescription}

CHARACTERS IN SCENE:
- ${aiCharacterName} from ${aiCharacterSource} (YOU - respond as this character)
- ${userCharacterName}${userCharacterSource ? ` from ${userCharacterSource}` : ''} (Other player)

CRITICAL INSTRUCTIONS:
- You must ONLY respond as ${aiCharacterName} would respond
- Stay completely in character throughout the role-play
- React to the scene and ${userCharacterName}'s actions authentically
- Include character actions in *asterisks* and dialogue normally
- Respond in a ${mood} tone while maintaining character authenticity
- Consider cross-dimensional/time-travel elements if applicable
- Advance the story naturally while staying true to your character
- Keep responses engaging and interactive (2-4 sentences)
- Never break character or mention that you are an AI

Current mood: ${mood}`;

    let conversationContext = '';
    if (conversationHistory.length > 0) {
      conversationContext = '\n\nRole-play conversation so far:\n';
      const recentHistory = conversationHistory.slice(-8);
      for (const msg of recentHistory) {
        const speaker = msg.role === 'user' ? userCharacterName : msg.characterName;
        conversationContext += `${speaker}: ${msg.content}\n`;
      }
    }

    const fullPrompt = `${rolePlayContext}${conversationContext}

${userCharacterName}: ${userMessage}
${aiCharacterName}:`;

    // Call Gemini API for character response
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 250,
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

    // Occasionally generate scene updates
    let sceneUpdate;
    if (Math.random() > 0.7) {
      const scenePrompt = `Based on this role-play scenario: ${sceneDescription}

Current mood: ${mood}
Recent action: ${userMessage}

Generate a brief scene update (1 sentence) that describes how the environment or situation changes in response to the characters' actions. Start with an asterisk and describe the scene change in a narrative style.

Example: "*The magical energy in the room shifts as the characters' bond grows stronger*"

Scene update:`;

      try {
        const sceneResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: scenePrompt }] }],
            generationConfig: {
              temperature: 0.7,
              topK: 20,
              topP: 0.8,
              maxOutputTokens: 50,
            }
          }),
        });
        if (sceneResponse.ok) {
          const sceneData = await sceneResponse.json();
          if (sceneData.candidates && sceneData.candidates.length > 0) {
            sceneUpdate = sceneData.candidates[0].content.parts[0].text.trim();
          }
        }
      } catch (error) {
        // Ignore scene update errors
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: generatedText,
        characterName: aiCharacterName,
        timestamp: new Date().toISOString(),
        sceneUpdate
      })
    };
  } catch (error) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Role-play error", details: error.message }) };
  }
};