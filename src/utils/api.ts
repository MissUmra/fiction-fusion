// API utility functions for AWS Lambda integration

// AWS Lambda endpoints
const CHARACTER_CHAT_URL = 'https://4vaqlobqg2coenrrhxmlp6nkma0fvldh.lambda-url.ap-south-1.on.aws/';
const ROLE_PLAY_URL = 'https://kasnkgiwkyac6f4lv4qyr32pzi0ptlvd.lambda-url.ap-south-1.on.aws/';
const STORY_CREATION_URL = 'https://sh4k2tccxx5cqmvsieqm5cqpny0jbymb.lambda-url.ap-south-1.on.aws/';

interface ChatRequest {
  characterName: string;
  characterSource: string;
  userMessage: string;
  mood: string;
  additionalInfo?: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

interface RolePlayRequest {
  aiCharacterName: string;
  aiCharacterSource: string;
  userCharacterName: string;
  userCharacterSource?: string;
  sceneDescription: string;
  userMessage: string;
  mood: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
    characterName: string;
  }>;
}

interface StoryCreationRequest {
  userCharacterName: string;
  userCharacterSource?: string;
  aiCharacters: Array<{
    name: string;
    source: string;
  }>;
  storyScript: string;
  userMessage: string;
  mood: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
    characterName: string;
  }>;
}

// Character Chat API
export const sendCharacterChatMessage = async (request: ChatRequest) => {
  try {
    const response = await fetch(CHARACTER_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Character chat API error:', error);
    throw error;
  }
};

// Role Play API
export const sendRolePlayMessage = async (request: RolePlayRequest) => {
  try {
    const response = await fetch(ROLE_PLAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send role-play message');
    }

    return await response.json();
  } catch (error) {
    console.error('Role-play API error:', error);
    throw error;
  }
};

// Story Creation API
export const sendStoryCreationMessage = async (request: StoryCreationRequest) => {
  try {
    const response = await fetch(STORY_CREATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send story creation message');
    }

    return await response.json();
  } catch (error) {
    console.error('Story creation API error:', error);
    throw error;
  }
};

// Enhanced fallback simulation functions with character-specific responses
export const simulateCharacterResponse = async (request: ChatRequest) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerName = request.characterName.toLowerCase();
  // const lowerSource = request.characterSource.toLowerCase();
  
  // Character-specific response patterns
  if (lowerName.includes('sherlock')) {
    const responses = [
      `*adjusts pipe thoughtfully* Fascinating observation. From my deduction, I can see that you're quite perceptive about this matter.`,
      `Elementary! Your question reveals a keen mind at work. Let me share what I've observed...`,
      `*steeples fingers* The evidence suggests that your inquiry is most intriguing. In my experience...`,
      `Watson would find this conversation most illuminating. As for myself, I deduce that...`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.characterName,
      timestamp: new Date().toISOString()
    };
  }
  
  if (lowerName.includes('hermione')) {
    const responses = [
      `*flips through a book excitedly* Oh, that's a wonderful question! I've read about this extensively...`,
      `According to "Hogwarts: A History" and several other sources, I can tell you that...`,
      `*raises hand eagerly* I know this one! The answer is quite fascinating actually...`,
      `That reminds me of something I learned in the library. Did you know that...`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.characterName,
      timestamp: new Date().toISOString()
    };
  }
  
  if (lowerName.includes('tony') || lowerName.includes('iron man')) {
    const responses = [
      `*taps arc reactor* Well, that's an interesting perspective. FRIDAY, what do you think? Just kidding, let me tell you...`,
      `You know, back when I was building the Mark 42, I had a similar thought. Here's the thing...`,
      `*adjusts sunglasses* That's either genius or completely insane. I like it. Let me explain why...`,
      `Pepper would probably disagree, but I think you're onto something here...`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.characterName,
      timestamp: new Date().toISOString()
    };
  }
  
  if (lowerName.includes('elsa')) {
    const responses = [
      `*ice crystals dance around fingers* That's a beautiful thought. In Arendelle, we believe that...`,
      `*smiles warmly* Anna would love to hear about this. As for me, I think...`,
      `The cold never bothered me, but your words warm my heart. Let me share...`,
      `*creates a small ice sculpture* Sometimes the most beautiful things come from understanding...`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.characterName,
      timestamp: new Date().toISOString()
    };
  }
  
  if (lowerName.includes('naruto')) {
    const responses = [
      `Dattebayo! That's so cool! You know, when I was training to become Hokage...`,
      `*grins widely* That reminds me of something Iruka-sensei taught me! Believe it!`,
      `Wow, that's amazing! Sasuke would probably say something cool about this, but I think...`,
      `*rubs back of head* Heh, that's pretty deep! Back in the Hidden Leaf Village...`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.characterName,
      timestamp: new Date().toISOString()
    };
  }
  
  // Mood-based generic responses
  const moodResponses = {
    funny: [
      `*chuckles* That's hilarious! You know what's even funnier? Let me tell you about the time...`,
      `Haha! That reminds me of something absolutely ridiculous that happened...`,
      `*bursts out laughing* Oh my goodness, that's so funny! Speaking of which...`,
      `You've got quite the sense of humor! That's almost as funny as when...`
    ],
    serious: [
      `That's a profound observation. I've given this considerable thought, and I believe...`,
      `*nods thoughtfully* This is indeed a serious matter that deserves careful consideration...`,
      `You raise an important point. In my experience, such matters require...`,
      `*speaks with gravity* This touches on something fundamental that I've long contemplated...`
    ],
    romantic: [
      `*gazes into the distance* That's beautifully said. It reminds me of the way love can...`,
      `*speaks softly* There's something magical about what you've shared. It makes me think of...`,
      `Your words touch my heart. In matters of love and connection, I've found that...`,
      `*smiles tenderly* That's so romantic. It brings to mind the way two hearts can...`
    ],
    sad: [
      `*sighs deeply* That's quite melancholy. I understand that feeling because...`,
      `*looks down with a heavy heart* Sometimes life brings such sorrow. I remember when...`,
      `That touches on something painful, doesn't it? I've experienced similar sadness when...`,
      `*speaks quietly* There's a deep sadness in what you've said. It reminds me of...`
    ],
    angry: [
      `*clenches fists* That's infuriating! I can't stand it when...`,
      `*voice rises with passion* You're absolutely right to be upset about this! It makes me angry too because...`,
      `*pounds table* This is exactly the kind of thing that drives me crazy! Let me tell you why...`,
      `*eyes flash with anger* That's completely unacceptable! I've dealt with similar frustrations when...`
    ]
  };
  
  const responses = moodResponses[request.mood as keyof typeof moodResponses] || [
    "That's really interesting! Tell me more about that.",
    "I see what you mean. From my perspective...",
    "That reminds me of something from my world...",
    "How fascinating! I never thought about it that way.",
    "That's quite different from what I'm used to!",
    "*reacts with curiosity* Could you explain that further?",
    "In my experience, things work a bit differently...",
    "That sounds like quite an adventure! What happened next?"
  ];

  return {
    message: responses[Math.floor(Math.random() * responses.length)],
    characterName: request.characterName,
    timestamp: new Date().toISOString()
  };
};

export const simulateRolePlayResponse = async (request: RolePlayRequest) => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerAiName = request.aiCharacterName.toLowerCase();
  
  // Character-specific role-play responses
  if (lowerAiName.includes('marinette')) {
    const responses = [
      `*Marinette looks up from her sketchbook, surprised* Oh! ${request.userCharacterName}! I wasn't expecting to see you here. *glances around nervously* This place is so strange... it's like we're in a completely different timeline.`,
      `*fidgets with her earrings* ${request.userCharacterName}, this is so weird! I feel like I'm meeting you for the first time, but also like I've known you forever.`,
      `*eyes widen in recognition* You're ${request.userCharacterName}! But you seem... different somehow. More experienced?`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.aiCharacterName,
      timestamp: new Date().toISOString()
    };
  }
  
  if (lowerAiName.includes('goku')) {
    const responses = [
      `*powers down from training stance* Whoa! ${request.userCharacterName}! You're really strong! I can sense your power level from here! *grins excitedly* Hey, wanna spar?`,
      `*scratches head* This is so cool! I've never seen anything like this before! *looks at ${request.userCharacterName}* You seem really powerful!`,
      `*stomach rumbles loudly* Man, all this interdimensional travel makes me hungry! *looks at ${request.userCharacterName}* Hey, do you know if there's any food around here?`
    ];
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      characterName: request.aiCharacterName,
      timestamp: new Date().toISOString()
    };
  }
  
  // Generic role-play responses based on mood
  const moodBasedResponses = {
    funny: [
      `*${request.aiCharacterName} bursts out laughing* ${request.userCharacterName}! This is absolutely ridiculous! *gestures wildly at the surroundings* What are the odds?`,
      `*grins widely* Well, this is unexpected! ${request.userCharacterName}, you've got to admit this whole situation is pretty hilarious.`,
      `*tries to keep a straight face but fails* ${request.userCharacterName}, I'm trying to be serious about this whole interdimensional thing, but honestly? This is the weirdest day ever!`
    ],
    serious: [
      `*${request.aiCharacterName} approaches cautiously* ${request.userCharacterName}, we need to be careful here. This place... there's something powerful about it.`,
      `*speaks with gravity* ${request.userCharacterName}, I'm glad you're here, but we need to understand what brought us to this place.`,
      `*nods solemnly* This situation is more complex than I initially thought, ${request.userCharacterName}. We need to approach this methodically.`
    ],
    romantic: [
      `*${request.aiCharacterName} looks at ${request.userCharacterName} with soft eyes* Even in this strange place, seeing you makes everything feel... right somehow.`,
      `*speaks tenderly* ${request.userCharacterName}, this magical place seems to have brought us together for a reason.`,
      `*smiles warmly* In all the chaos of this interdimensional meeting, you're like a beacon of light, ${request.userCharacterName}.`
    ]
  };
  
  const responses = moodBasedResponses[request.mood as keyof typeof moodBasedResponses] || [
    `*${request.aiCharacterName} looks around curiously* ${request.userCharacterName}! What an unexpected meeting! This place is fascinating.`,
    `*waves enthusiastically* ${request.userCharacterName}! I can't believe we're actually here together! What should we explore first?`,
    `*${request.aiCharacterName} studies the surroundings* This is remarkable, ${request.userCharacterName}. I have so many questions about this situation.`
  ];

  return {
    message: responses[Math.floor(Math.random() * responses.length)],
    characterName: request.aiCharacterName,
    timestamp: new Date().toISOString()
  };
};

export const simulateStoryCreationResponse = async (request: StoryCreationRequest) => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Randomly select 1-2 characters to respond
  const respondingCharacters = request.aiCharacters
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(2, Math.max(1, request.aiCharacters.length)));
  
  const responses = respondingCharacters.map((character) => {
    const characterResponses = [
      `*${character.name} reacts thoughtfully* That's an interesting perspective, ${request.userCharacterName}! From my experience in ${character.source}...`,
      `*${character.name} nods* I can relate to that, ${request.userCharacterName}. In my world, we often face similar challenges.`,
      `*${character.name} looks curious* Tell me more about that, ${request.userCharacterName}. How does it work in your dimension?`,
      `*${character.name} smiles* That reminds me of an adventure I had once, ${request.userCharacterName}...`,
      `*${character.name} considers this* You know, that's quite different from how things work where I come from, ${request.userCharacterName}.`
    ];

    return {
      message: characterResponses[Math.floor(Math.random() * characterResponses.length)],
      characterName: character.name,
      timestamp: new Date().toISOString()
    };
  });

  const narratorUpdates = [
    "*The magical energy in the area shifts, creating new possibilities for adventure*",
    "*The dimensional space responds to the characters' growing bonds, becoming more harmonious*",
    "*Reality itself seems to pulse with the combined energy of the assembled heroes*",
    "*The convergence point stabilizes as the characters work together*",
    "*New pathways between dimensions begin to form around the group*"
  ];

  return {
    responses,
    narratorUpdate: Math.random() > 0.7 ? narratorUpdates[Math.floor(Math.random() * narratorUpdates.length)] : undefined
  };
};