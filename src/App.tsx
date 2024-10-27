import React, { useState, useRef, useEffect } from 'react';
import pinyin from 'pinyin';
import { MicButton } from './components/MicButton';
import { WaveAnimation } from './components/WaveAnimation';
import { TranslationResult } from './components/TranslationResult';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [translation, setTranslation] = useState<{ text: string; pinyin: string }>({ text: '', pinyin: '' });
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
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
          style: pinyin.STYLE_TONE_MARK,
        }).join(' ');

        setTranslation({
          text: transcript,
          pinyin: pinyinText,
        });
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Voice to Chinese
        </h1>

        <div className="flex flex-col items-center">
          <MicButton
            isListening={isListening}
            onStart={startListening}
            onStop={stopListening}
          />
          <WaveAnimation isActive={isListening} />
        </div>

        <div className="space-y-4 mt-8">
          <TranslationResult
            text={translation.text}
            pinyin={translation.pinyin}
          />
        </div>
      </div>
    </div>
  );
}

export default App;