import { pinyin } from 'pinyin-pro';
import { MatchResult } from '../types/chinese';

// Normalize pinyin by removing tones and spaces
export function normalizePinyin(text: string): string {
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
  
  if (normalizedSpoken.includes(normalizedTarget)) {
    // If the base pronunciation matches, check if the tones match
    const spokenWithTones = pinyin(spoken, {
      toneType: 'symbol',
      type: 'string',
      nonZh: 'removed'
    });
    
    return spokenWithTones.includes(target) ? MatchResult.Full : MatchResult.Partial;
  }
  
  return MatchResult.None;
}