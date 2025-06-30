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
      userCharacterName,
      userCharacterSource,
      aiCharacters,
      storyScript,
      userMessage,
      mood,
      conversationHistory = []
    } = body;

    if (!userCharacterName || !aiCharacters || aiCharacters.length === 0 || !storyScript || !userMessage) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing required fields" }) };
    }
    if (!GEMINI_API_KEY) {
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Gemini API key not configured" }) };
    }

    // Randomly select 1-2 characters to respond
    const respondingCharacters = aiCharacters
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(2, Math.max(1, aiCharacters.length)));

    const responses = [];

    for (const character of respondingCharacters) {
      try {
        const storyContext = `MULTI-CHARACTER STORY CREATION:

STORY SETTING: ${storyScript}

You are ${character.name} from ${character.source} in this crossover story scenario.

ALL CHARACTERS IN STORY:
- ${userCharacterName}${userCharacterSource ? ` from ${userCharacterSource}` : ''} (User-controlled)
${aiCharacters.map(char => `- ${char.name} from ${char.source} (AI-controlled)`).join('\n')}

CRITICAL INSTRUCTIONS:
- You must ONLY respond as ${character.name} would respond
- Stay completely in character throughout the story
- React to ${userCharacterName}'s actions and other characters authentically
- Include character actions in *asterisks* and dialogue normally
- Respond in a ${mood} tone while maintaining character authenticity
- Consider crossover story elements and dimensional interactions
- Keep responses engaging and advance the story naturally (2-4 sentences)
- Interact with other characters when appropriate
- Never break character or mention that you are an AI

Current mood: ${mood}`;

        let conversationContext = '';
        if (conversationHistory.length > 0) {
          conversationContext = '\n\nStory conversation so far:\n';
          const recentHistory = conversationHistory.slice(-10);
          for (const msg of recentHistory) {
            const speaker = msg.role === 'user' ? userCharacterName : msg.characterName;
            conversationContext += `${speaker}: ${msg.content}\n`;
          }
        }

        const fullPrompt = `${storyContext}${conversationContext}

${userCharacterName}: ${userMessage}
${character.name}:`;

        const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: {
              temperature: 0.9,
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

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          if (geminiData.candidates && geminiData.candidates.length > 0) {
            const generatedText = geminiData.candidates[0].content.parts[0].text.trim();
            responses.push({
              message: generatedText,
              characterName: character.name,
              timestamp: new Date().toISOString()
            });
          }
        }
      } catch (error) {
        // Ignore individual character errors
      }
    }

    // Occasionally generate narrator update
    let narratorUpdate;
    if (Math.random() > 0.6) {
      const narratorPrompt = `Based on this crossover story scenario: ${storyScript}
Current mood: ${mood}
Recent user action: ${userMessage}
Characters involved: ${aiCharacters.map(c => c.name).join(', ')}

Generate a brief narrator update (1 sentence) that describes how the story environment or situation evolves in response to the characters' interactions. Start with an asterisk and write in a narrative style that advances the crossover story.

Example: "*The dimensional barriers begin to shimmer as the characters' combined energies create new possibilities*"

Narrator update:`;

      try {
        const narratorResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: narratorPrompt }] }],
            generationConfig: {
              temperature: 0.8,
              topK: 30,
              topP: 0.9,
              maxOutputTokens: 60,
            }
          }),
        });
        if (narratorResponse.ok) {
          const narratorData = await narratorResponse.json();
          if (narratorData.candidates && narratorData.candidates.length > 0) {
            narratorUpdate = narratorData.candidates[0].content.parts[0].text.trim();
          }
        }
      } catch (error) {
        // Ignore narrator update errors
      }
    }

    if (responses.length === 0) {
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Failed to generate any character responses" }) };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        responses,
        narratorUpdate
      })
    };
  } catch (error) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Story creation error", details: error.message }) };
  }
};