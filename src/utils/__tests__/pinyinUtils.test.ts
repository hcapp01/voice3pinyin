import { describe, it, expect } from 'vitest';
import { normalizePinyin } from '../pinyinUtils';

describe('normalizePinyin', () => {
  it('removes tones and spaces from pinyin text', () => {
    const input = 'nǐ hǎo';
    const expected = 'nihao';
    expect(normalizePinyin(input)).toBe(expected);
  });
});