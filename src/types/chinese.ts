export interface ChineseWord {
  word: string;
  pinyin: string;
  meaning: string;
}

export enum MatchResult {
  None = 0,
  Partial = 1,
  Full = 2
}

export interface TranslationState {
  text: string;
  pinyin: string;
  matchResult?: MatchResult;
}