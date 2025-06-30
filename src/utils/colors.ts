// Modern Game-Styled Dark Theme Colors - Vibrant & Fun Edition

export const darkTheme = {
  // Backgrounds - Vibrant dark tones with energy
  background: {
    primary: '#0F0F23',      // Deep Vibrant Navy
    secondary: '#1A1D35',    // Rich Electric Blue
    tertiary: '#252A45',     // Energetic Purple
    card: '#2D3348',         // Bright Card Background
  },
  
  // Text Colors - Bright and energetic
  text: {
    primary: '#FFFFFF',      // Pure White
    secondary: '#F0F2F5',    // Bright Light Gray
    tertiary: '#D1D5DB',     // Light Gray
    muted: '#9CA3AF',        // Medium Gray
  },
  
  // Accent Colors - Vibrant and energetic
  accent: {
    primary: '#00E5FF',      // Electric Bright Cyan
    secondary: '#FF69B4',    // Hot Pink
    tertiary: '#9C27B0',     // Bright Purple
    success: '#4CAF50',      // Bright Green
    warning: '#FF9800',      // Bright Orange
    error: '#F44336',        // Bright Red
  },
  
  // Special Colors - Your requested colors + vibrant additions
  special: {
    lime: '#80B626',         // Your Lime Green
    magenta: '#CF79EF',      // Your Magenta
    yellow: '#E4EC68',       // Your Yellow
    peach: '#FFB74D',        // Bright Peach
    lavender: '#E1BEE7',     // Bright Lavender
    avocado: '#8BC34A',      // Bright Avocado
    coral: '#FF7043',        // Bright Coral
    mint: '#4DD0E1',         // Bright Mint
    gold: '#FFD700',         // Bright Gold
  },
  
  // Acrylic Colors - Vibrant and energetic
  acrylic: {
    color1: '#00E5FF',       // Electric Cyan
    color2: '#FF69B4',       // Hot Pink
    color3: '#80B626',       // Your Lime Green
    color4: '#CF79EF',       // Your Magenta
    color5: '#E4EC68',       // Your Yellow
  },
  
  // Borders and Dividers - Brighter
  border: {
    primary: '#4A5568',      // Brighter Border
    secondary: '#6B7280',    // Medium Bright Border
    accent: '#00E5FF60',     // Bright Accent Border
  },
  
  // Glass Effects - More vibrant
  glass: {
    background: 'rgba(45, 51, 72, 0.85)',
    border: 'rgba(0, 229, 255, 0.3)',
    backdrop: 'blur(20px)',
  },
  
  // Gradients - Vibrant and fun
  gradients: {
    primary: 'linear-gradient(135deg, #00E5FF 0%, #9C27B0 100%)',
    secondary: 'linear-gradient(135deg, #FF69B4 0%, #FFB74D 100%)',
    tertiary: 'linear-gradient(135deg, #80B626 0%, #4DD0E1 100%)',
    chat: 'linear-gradient(135deg, #00E5FF 0%, #CF79EF 100%)',
    play: 'linear-gradient(135deg, #FF69B4 0%, #E4EC68 100%)',
    create: 'linear-gradient(135deg, #80B626 0%, #FFB74D 100%)',
    hero: 'linear-gradient(135deg, #9C27B0 0%, #00E5FF 30%, #FF69B4 60%, #80B626 100%)',
    // Enhanced acrylic painting texture
    acrylic: `
      radial-gradient(circle at 15% 25%, rgba(0, 229, 255, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 85% 75%, rgba(255, 105, 180, 0.35) 0%, transparent 45%),
      radial-gradient(circle at 45% 85%, rgba(128, 182, 38, 0.3) 0%, transparent 60%),
      radial-gradient(circle at 75% 15%, rgba(207, 121, 239, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 25% 65%, rgba(228, 236, 104, 0.3) 0%, transparent 55%),
      linear-gradient(135deg, #0F0F23 0%, #1A1D35 30%, #252A45 70%, #2D3348 100%)
    `,
  },
  
  // Component specific colors - More vibrant
  components: {
    button: {
      primary: 'linear-gradient(135deg, #00E5FF 0%, #9C27B0 100%)',
      secondary: 'linear-gradient(135deg, #FF69B4 0%, #FFB74D 100%)',
      success: 'linear-gradient(135deg, #4CAF50 0%, #80B626 100%)',
    },
    input: {
      background: 'rgba(45, 51, 72, 0.7)',
      border: '#4A5568',
      focus: '#00E5FF',
    },
    card: {
      background: 'rgba(45, 51, 72, 0.85)',
      border: 'rgba(74, 85, 104, 0.7)',
      hover: 'rgba(45, 51, 72, 0.95)',
    }
  }
};

// Light theme removed as requested - only dark theme
export const lightTheme = darkTheme; // Fallback to dark theme

// Current theme is always dark
export const currentTheme = darkTheme;

// Character Avatar Mapping
export const characterAvatars = {
  // Pokemon
  'pikachu': '⚡',
  'charizard': '🔥',
  'blastoise': '🌊',
  'venusaur': '🌿',
  'mewtwo': '🧠',
  'mew': '💫',
  'lucario': '🥋',
  'garchomp': '🦈',
  
  // Ben 10
  'ben tennyson': '⌚',
  'ben 10': '⌚',
  'four arms': '💪',
  'heatblast': '🔥',
  'diamondhead': '💎',
  'xlr8': '💨',
  'upgrade': '🤖',
  'ghostfreak': '👻',
  'wildmutt': '🐺',
  'grey matter': '🧠',
  'stinkfly': '🦟',
  'ripjaws': '🦈',
  'kevin 11': '👾',
  'gwen tennyson': '✨',
  
  // Slugterra
  'eli shane': '🎯',
  'burpy': '🔥',
  'joules': '⚡',
  'doc': '💚',
  'banger': '💥',
  
  // Frozen
  'elsa': '❄️',
  'anna': '🌸',
  'olaf': '☃️',
  'kristoff': '🏔️',
  'sven': '🦌',
  
  // Disney
  'mickey mouse': '🐭',
  'minnie mouse': '🎀',
  'donald duck': '🦆',
  'goofy': '🐕',
  'pluto': '🐶',
  'simba': '🦁',
  'ariel': '🧜‍♀️',
  'belle': '📚',
  'jasmine': '🏺',
  'mulan': '⚔️',
  'moana': '🌊',
  'rapunzel': '👸',
  'cinderella': '👠',
  'snow white': '🍎',
  'sleeping beauty': '🌹',
  'aurora': '🌹',
  'tiana': '🐸',
  'pocahontas': '🍃',
  'merida': '🏹',
  
  // Marvel Avengers
  'iron man': '🤖',
  'tony stark': '🤖',
  'captain america': '🛡️',
  'steve rogers': '🛡️',
  'thor': '⚡',
  'hulk': '💚',
  'bruce banner': '💚',
  'black widow': '🕷️',
  'natasha romanoff': '🕷️',
  'hawkeye': '🏹',
  'clint barton': '🏹',
  'spider-man': '🕷️',
  'peter parker': '🕷️',
  'doctor strange': '🔮',
  'scarlet witch': '🔴',
  'wanda maximoff': '🔴',
  'vision': '💎',
  'falcon': '🦅',
  'winter soldier': '🦾',
  'ant-man': '🐜',
  'wasp': '🐝',
  'captain marvel': '⭐',
  'black panther': '🐾',
  'groot': '🌳',
  'rocket': '🦝',
  'star-lord': '🚀',
  'gamora': '⚔️',
  'drax': '💪',
  'mantis': '🦋',
  'nebula': '🤖',
  'loki': '🐍',
  'thanos': '💜',
  
  // Sherlock Holmes
  'sherlock holmes': '🔍',
  'john watson': '🩺',
  'mycroft holmes': '🎩',
  'moriarty': '🎭',
  'irene adler': '💋',
  
  // Geronimo Stilton
  'geronimo stilton': '🐭',
  'thea stilton': '📰',
  'trap stilton': '🎪',
  'benjamin stilton': '📚',
  
  // Barbie
  'barbie': '💖',
  'ken': '👨‍🦱',
  'skipper': '🏄‍♀️',
  'stacie': '⚽',
  'chelsea': '🧸',
  
  // Mermaids
  'mermaid': '🧜‍♀️',
  'aquaman': '🔱',
  'poseidon': '🌊',
  'ursula': '🐙',
  
  // Transformers
  'optimus prime': '🚛',
  'bumblebee': '🚗',
  'megatron': '🤖',
  'starscream': '✈️',
  'ironhide': '🚙',
  'ratchet': '🚑',
  'jazz': '🎵',
  
  // Harry Potter
  'harry potter': '⚡',
  'hermione granger': '📚',
  'ron weasley': '🦉',
  'dumbledore': '🧙‍♂️',
  'snape': '🖤',
  'hagrid': '🐻',
  'voldemort': '🐍',
  'draco malfoy': '🐍',
  'ginny weasley': '❤️',
  'luna lovegood': '🌙',
  'neville longbottom': '🌱',
  'sirius black': '🐺',
  'remus lupin': '🌕',
  'dobby': '🧦',
  
  // Anime Characters
  'naruto': '🍜',
  'naruto uzumaki': '🍜',
  'sasuke': '⚡',
  'sasuke uchiha': '⚡',
  'sakura': '🌸',
  'sakura haruno': '🌸',
  'kakashi': '👁️',
  'goku': '🥋',
  'vegeta': '👑',
  'luffy': '🏴‍☠️',
  'monkey d luffy': '🏴‍☠️',
  'zoro': '⚔️',
  'sanji': '👨‍🍳',
  'nami': '🗺️',
  'chopper': '🦌',
  'robin': '📖',
  'franky': '🤖',
  'brook': '🎵',
  'usopp': '🎯',
  'ichigo': '⚔️',
  'rukia': '❄️',
  'natsu': '🔥',
  'natsu dragneel': '🔥',
  'lucy': '⭐',
  'lucy heartfilia': '⭐',
  'erza': '⚔️',
  'gray': '❄️',
  'edward elric': '⚗️',
  'alphonse elric': '🛡️',
  'light yagami': '📓',
  'l': '🍰',
  'senku': '🧪',
  'senku ishigami': '🧪',
  
  // Default fallbacks
  'default': '🎭',
  'ai': '🤖',
  'character': '🎪',
  'hero': '⭐',
  'villain': '👹',
  'princess': '👸',
  'prince': '🤴',
  'wizard': '🧙‍♂️',
  'witch': '🧙‍♀️',
  'robot': '🤖',
  'alien': '👽',
  'monster': '👾',
  'dragon': '🐉',
  'unicorn': '🦄',
  'fairy': '🧚‍♀️',
  'angel': '👼',
  'demon': '😈',
  'ghost': '👻',
  'vampire': '🧛‍♂️',
  'werewolf': '🐺',
  'pirate': '🏴‍☠️',
  'ninja': '🥷',
  'samurai': '⚔️',
  'knight': '🛡️',
  'archer': '🏹',
  'mage': '🔮',
  'healer': '💚',
  'warrior': '⚔️',
  'assassin': '🗡️',
  'thief': '🥷',
  'bard': '🎵',
  'ranger': '🏹',
  'paladin': '✨',
  'necromancer': '💀',
  'druid': '🌿',
  'sorcerer': '⚡',
  'warlock': '🔥',
  'cleric': '✨',
  'monk': '🥋',
  'barbarian': '💪',
  'rogue': '🗡️'
};

// Helper function to get character avatar
export const getCharacterAvatar = (characterName: string): string => {
  if (!characterName) return characterAvatars.default;
  
  const name = characterName.toLowerCase().trim();
  
  // Direct match
  if (characterAvatars[name]) {
    return characterAvatars[name];
  }
  
  // Partial match
  for (const [key, avatar] of Object.entries(characterAvatars)) {
    if (name.includes(key) || key.includes(name)) {
      return avatar;
    }
  }
  
  // Fallback based on keywords
  if (name.includes('pokemon') || name.includes('pokémon')) return '⚡';
  if (name.includes('ben') && name.includes('10')) return '⌚';
  if (name.includes('slug')) return '🎯';
  if (name.includes('frozen')) return '❄️';
  if (name.includes('disney')) return '🏰';
  if (name.includes('marvel') || name.includes('avenger')) return '🦸‍♂️';
  if (name.includes('sherlock')) return '🔍';
  if (name.includes('stilton')) return '🐭';
  if (name.includes('barbie')) return '💖';
  if (name.includes('mermaid')) return '🧜‍♀️';
  if (name.includes('transformer')) return '🤖';
  if (name.includes('harry') && name.includes('potter')) return '⚡';
  if (name.includes('anime') || name.includes('manga')) return '🎌';
  
  return characterAvatars.default;
};

// Helper functions for easy color access
export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = darkTheme;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return '#00E5FF'; // fallback color
  }
  
  return value;
};

// Commonly used color combinations - Updated with vibrant colors
export const colorCombinations = {
  // Button styles
  primaryButton: {
    background: darkTheme.gradients.primary,
    text: darkTheme.text.primary,
    hover: darkTheme.accent.primary,
  },
  
  // Card styles
  card: {
    background: darkTheme.components.card.background,
    border: darkTheme.components.card.border,
    text: darkTheme.text.primary,
  },
  
  // Input styles
  input: {
    background: darkTheme.components.input.background,
    border: darkTheme.components.input.border,
    text: darkTheme.text.primary,
    placeholder: darkTheme.text.muted,
  },
  
  // Message bubbles
  userMessage: {
    background: darkTheme.gradients.primary,
    text: darkTheme.text.primary,
  },
  
  characterMessage: {
    background: darkTheme.components.card.background,
    text: darkTheme.text.primary,
    border: darkTheme.border.accent,
  }
};