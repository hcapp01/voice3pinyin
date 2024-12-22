import { useState, useRef, useEffect, useCallback } from 'react';
import { pinyin } from 'pinyin-pro';
import { TranslationState, MatchResult } from '../types/chinese';
import { comparePinyinWithTones } from '../utils/pinyinUtils';

export function useSpeechRecognition(targetWord: string, targetPinyin: string) {
  const [isListening, setIsListening] = useState(false);
  const [translation, setTranslation] = useState<TranslationState>({ 
    text: '', 
    pinyin: '',
    matchResult: undefined 
  });
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isRecognitionActiveRef = useRef(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'zh-CN';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      const spokenPinyin = pinyin(transcript, {
        toneType: 'symbol',
        type: 'string'
      });

      const displayPinyin = pinyin(transcript, {
        toneType: 'symbol',
        type: 'array'
      }).join(' ');

      // Check for exact character match first
      const matchResult = comparePinyinWithTones(spokenPinyin, targetPinyin);

      setTranslation({
        text: transcript,
        pinyin: displayPinyin,
        matchResult
      });

      if (matchResult === MatchResult.Full) {
        stopListening();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isRecognitionActiveRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      isRecognitionActiveRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        isRecognitionActiveRef.current = false;
      }
    };
  }, [targetWord, targetPinyin]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isRecognitionActiveRef.current) return;

    try {
      setTranslation({ text: '', pinyin: '', matchResult: undefined });
      recognitionRef.current.start();
      isRecognitionActiveRef.current = true;
      setIsListening(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to start recognition:', error.message);
      }
      isRecognitionActiveRef.current = false;
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isRecognitionActiveRef.current) return;

    try {
      recognitionRef.current.stop();
      isRecognitionActiveRef.current = false;
      setIsListening(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to stop recognition:', error.message);
      }
    }
  }, []);

  return {
    isListening,
    translation,
    startListening,
    stopListening,
  };
}