import React, { useState, type JSX } from 'react';
import { createTranscription, fetchTranscriptions } from '../services/api';
import type { Transcription } from '../types';

interface Props {
  onCreated: (t: Transcription[]) => void;
}

export default function SubmitForm({ onCreated }: Props): JSX.Element {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessId(null);

    if (!validateUrl(audioUrl)) {
      setError('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    try {
      const id = await createTranscription(audioUrl);
      setSuccessId(id);
      setAudioUrl('');

      // Fetch full record and notify parent
      const record = await fetchTranscriptions();
      onCreated(record);

    } catch (err: any) {
      setError(err.message || 'Request failed');
      // setAudioUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Submit Audio URL</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <span>Audio URL</span>
          <input type="url" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://example.com/sample.mp3" required />
        </label>

        <div className="actions">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Transcribe'}
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
      {successId && (
        <div className="success">
          Transcription created — ID: <strong>{successId}</strong>
        </div>
      )}
    </section>
  );
}