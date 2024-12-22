import React, { useState, useEffect } from 'react';
import { MicButton } from './components/MicButton';
import { TranslationBox } from './components/TranslationBox';
import { TargetWord } from './components/TargetWord';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { chineseWords } from './utils/chineseWords';

function App() {
  const [currentWord, setCurrentWord] = useState(chineseWords[0]);

  const { isListening, translation, startListening, stopListening } = useSpeechRecognition(
    currentWord.word,
    currentWord.pinyin
  );

  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * chineseWords.length);
    setCurrentWord(chineseWords[randomIndex]);
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Voice to Chinese
        </h1>

        <TargetWord 
          word={currentWord}
          onRefresh={generateNewWord}
        />

        <TranslationBox 
          translation={translation}
          isListening={isListening}
        />

        <div className="flex justify-center">
          <MicButton
            isListening={isListening}
            onStart={startListening}
            onStop={stopListening}
          />
        </div>
      </div>
    </div>
  );
}