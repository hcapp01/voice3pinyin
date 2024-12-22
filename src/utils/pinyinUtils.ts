import { pinyin } from 'pinyin-pro';
import { MatchResult } from '../types/chinese';

// Normalize pinyin by removing tones and spaces
export function normalizePinyin(text: string): string {
  // Handle non-Chinese text (like pinyin) directly
  if (!/[\u4e00-\u9fa5]/.test(text)) {
    return text.toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => {
      const base = {
        'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
        'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
        'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
        'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
        'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
        'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v'
      }[char] || char;
      return base;
    }).replace(/\s+/g, '');
  }

  // Use pinyin-pro for Chinese characters
  return pinyin(text, {
    toneType: 'none',
    type: 'string',
    nonZh: 'removed'
  }).toLowerCase().replace(/\s+/g, '');
}

// Compare pinyin with tones
export function comparePinyinWithTones(spoken: string, target: string): MatchResult {
  const normalizedSpoken = normalizePinyin(spoken);
  const normalizedTarget = normalizePinyin(target);
  
  let result = MatchResult.None;
  
  if (normalizedSpoken.includes(normalizedTarget)) {
    result = spoken.includes(target) ? MatchResult.Full : MatchResult.Partial;
  }

  console.log(`Pinyin comparison - Spoken: "${spoken}", Target: "${target}", Result: ${MatchResult[result]} (${result})`);
  return result;
}