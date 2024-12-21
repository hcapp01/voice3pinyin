import React, { useState, useEffect } from 'react';
import { MicButton } from './components/MicButton';
import { WaveAnimation } from './components/WaveAnimation';
import { TranslationResult } from './components/TranslationResult';
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Voice to Chinese
        </h1>

        <TargetWord 
          word={currentWord}
          onRefresh={generateNewWord}
        />

        <TranslationResult translation={translation} />

        <div className="flex flex-col items-center mt-8">
          <MicButton
            isListening={isListening}
            onStart={startListening}
            onStop={stopListening}
          />
          <WaveAnimation isActive={isListening} />
        </div>
      </div>
    </div>
  );
}

export default App;