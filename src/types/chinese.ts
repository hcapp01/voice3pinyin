export interface ChineseWord {
  word: string;
  pinyin: string;
  meaning: string;
}

export interface TranslationState {
  text: string;
  pinyin: string;
  isCorrect?: boolean;
}