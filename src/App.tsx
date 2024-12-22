import React, { useState, useEffect } from 'react';
import { TargetWord } from './components/TargetWord';
import { SpeechInput } from './components/SpeechInput';
import { Fireworks } from './components/Fireworks';
import { chineseWords } from './utils/chineseWords';
import { MatchResult } from './types/chinese';

function App() {
  const [currentWord, setCurrentWord] = useState(chineseWords[0]);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * chineseWords.length);
    setCurrentWord(chineseWords[randomIndex]);
  };

  const handleMatch = (matchResult: MatchResult | undefined) => {
    if (matchResult === MatchResult.Full) {
      setShowFireworks(true);
      setTimeout(() => {
        setShowFireworks(false);
      }, 2000);
    }
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
          isListening={isListening}
        />

        <SpeechInput
          targetWord={currentWord.word}
          targetPinyin={currentWord.pinyin}
          onMatch={handleMatch}
          onListeningChange={setIsListening}
        />
      </div>
      {showFireworks && <Fireworks />}
    </div>
  );
}

export default App;