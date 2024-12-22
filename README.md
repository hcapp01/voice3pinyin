

## Prerequisites

This package uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project.

## Usage

```tsx
import { SpeechInput, MatchResult } from '@hcapp01/voice-2-pinyin';

function App() {
  const handleMatch = (matchResult: MatchResult | undefined) => {
    if (matchResult === MatchResult.Full) {
      console.log('Perfect match!');
    }
  };

  return (
    <SpeechInput
      targetWord="你好"
      targetPinyin="nǐ hǎo"
      onMatch={handleMatch}
    />
  );
}
```


### Hooks

#### useSpeechRecognition

```tsx
const { isListening, translation, startListening, stopListening } = useSpeechRecognition(
  targetWord,
  targetPinyin,
  onMatch
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