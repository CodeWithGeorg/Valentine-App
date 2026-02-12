// Basic profanity filter - replace with a more comprehensive solution in production
const profanityList = [
  'fuck', 'shit', 'ass', 'bitch', 'bastard', 'damn', 'hell', 
  'piss', 'crap', 'dick', 'cock', 'pussy', 'cunt', 'slut', 
  'whore', 'fag', 'nigger', 'chink', 'spic', 'kike', 'raghead',
  'retard', 'idiot', 'stupid', 'ugly', 'hate', 'kill', 'die',
  'stupid', 'dumb', 'loser', 'worthless', 'trash', 'scum'
];

export function filterProfanity(text: string): string {
  let filteredText = text;
  
  profanityList.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredText = filteredText.replace(regex, '*'.repeat(word.length));
  });
  
  return filteredText;
}

export function validateMessage(content: string): { valid: boolean; error?: string } {
  // Check minimum length
  if (content.trim().length < 2) {
    return { valid: false, error: 'Message must be at least 2 characters long' };
  }
  
  // Check maximum length
  if (content.length > 150) {
    return { valid: false, error: 'Message must be less than 150 characters' };
  }
  
  // Check for empty or whitespace-only messages
  if (!content.trim()) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  return { valid: true };
}

export function validatePageData(name: string, message: string): { valid: boolean; error?: string } {
  // Check name
  if (name.trim().length < 1) {
    return { valid: false, error: 'Name is required' };
  }
  
  if (name.length > 50) {
    return { valid: false, error: 'Name must be less than 50 characters' };
  }
  
  // Check message
  if (message.trim().length < 1) {
    return { valid: false, error: 'Message is required' };
  }
  
  if (message.length > 300) {
    return { valid: false, error: 'Message must be less than 300 characters' };
  }
  
  return { valid: true };
}

// Emoji ranges for detection
const emojiRanges = [
  '\u{1F600}-\u{1F64F}', // Emoticons
  '\u{1F300}-\u{1F5FF}', // Misc Symbols and Pictographs
  '\u{1F680}-\u{1F6FF}', // Transport and Map
  '\u{1F1E0}-\u{1F1FF}', // Regional Indicator
];

function hasEmojiRegex(text: string): boolean {
  for (const range of emojiRanges) {
    const regex = new RegExp(`[${range}]`, 'u');
    if (regex.test(text)) {
      return true;
    }
  }
  return false;
}

function countEmojisRegex(text: string): number {
  let count = 0;
  for (const range of emojiRanges) {
    const regex = new RegExp(`[${range}]`, 'gu');
    const matches = text.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

export function hasEmoji(text: string): boolean {
  return hasEmojiRegex(text);
}

export function countEmojis(text: string): number {
  return countEmojisRegex(text);
}

