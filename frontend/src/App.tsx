import { useState } from 'react';
import SubmitForm from './components/SubmitForm';
import TranscriptionList from './components/TranscriptionList';
import type { Transcription } from './types';

export default function App() {
  const [items, setItems] = useState<Transcription[]>([]);

  // When new transcription is created, add it locally
  const handleNewTranscription = (t: Transcription[]) => {
    setItems(t);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Transcription Service</h1>
        <p className="subtitle">Paste an audio URL and get a mocked transcription saved to the server</p>
      </header>

      <main>
        <SubmitForm onCreated={handleNewTranscription} />
        <TranscriptionList items={items} setItems={setItems} />
      </main>
      
    </div>
  );
}
