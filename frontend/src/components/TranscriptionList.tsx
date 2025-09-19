import { useEffect, type JSX } from 'react';
import { fetchTranscriptions } from '../services/api';
import type { Transcription } from '../types';

interface Props {
    items: Transcription[];
    setItems: React.Dispatch<React.SetStateAction<Transcription[]>>;
}

export default function TranscriptionList({ items, setItems }: Props): JSX.Element {
    useEffect(() => {
        fetchTranscriptions().then((data) => setItems(data)).catch(() => setItems([]));
    }, [setItems]);

    if (!items || items.length === 0) return <div className="card">No transcriptions available.</div>;

    return (
        <section className="card">
            <h2>Recent Transcriptions</h2>
            <ul className="list">
                {
                    items.map((t) => (
                        <li key={t._id} className="list-item">
                            <div>
                                <strong>ID : </strong> {t._id}
                            </div>
                            <div>
                                <strong>Audio : </strong> <a href={t.audioUrl} target="_blank" rel="noreferrer">{t.audioUrl}</a>
                            </div>
                            <div>
                                <strong>Text : </strong> {t.transcription}
                            </div>
                            <div className="muted">
                                {new Date(t.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}