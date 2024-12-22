

## Prerequisites

This package uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project.

## Usage

```tsx
import { SpeechInput, MatchResult } from '@hcapp01/voice-2-pinyin';

function App() {
  const [isListening, setIsListening] = useState(false);

  const handleMatch = (matchResult: MatchResult | undefined) => {
    if (matchResult === MatchResult.Full) {
      console.log('Perfect match!');
    }
  };

  return (
    <div className="relative h-[440px] border-2 rounded-xl p-6">
      <SpeechInput
        targetWord="你好"
        targetPinyin="nǐ hǎo"
        onMatch={handleMatch}
        onListeningChange={setIsListening}
      />
    </div>
  );
}
```

### Component Layout

The SpeechInput component follows a specific layout structure:

2. Mic button is always centered in the container
3. RecognizedSpeech area appears above the mic button and takes 1/3 of container height
4. TargetWord component should be positioned at the bottom
5. The mic button's position remains stable when pressed


### Hooks

#### useSpeechRecognition

```tsx
const { isListening, translation, startListening, stopListening } = useSpeechRecognition(
  targetWord,
  targetPinyin,
  onMatch,
  onListeningChange
);
```

## Types

```ts
enum MatchResult {
  None = 0,
  Partial = 1,
  Full = 2
}

interface TranslationState {
  text: string;
  pinyin: string;
  matchResult?: MatchResult;
}

```