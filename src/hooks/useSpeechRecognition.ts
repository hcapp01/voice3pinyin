import { useState, useRef, useEffect, useCallback } from 'react';
import { pinyin } from 'pinyin-pro';
import { TranslationState } from '../types/chinese';

export function useSpeechRecognition(targetWord: string) {
  const [isListening, setIsListening] = useState(false);
  const [translation, setTranslation] = useState<TranslationState>({ 
    text: '', 
    pinyin: '',
    isCorrect: undefined 
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

      const pinyinText = pinyin(transcript, {
        toneType: 'symbol',
        type: 'array'
      }).join(' ');

      const isCorrect = transcript.includes(targetWord);

      setTranslation({
        text: transcript,
        pinyin: pinyinText,
        isCorrect
      });

      if (isCorrect) {
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
  }, [targetWord]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isRecognitionActiveRef.current) return;

    try {
      setTranslation({ text: '', pinyin: '', isCorrect: undefined });
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