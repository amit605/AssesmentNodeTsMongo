import type { Transcription } from '../types';


const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';


export async function createTranscription(audioUrl: string): Promise<string> {
    const res = await fetch(`${API_BASE}/transcription_create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl }),
    });

    if (!res.ok) {
        const bodyText = await res.text();
        throw new Error(`Server error: ${res.status} ${bodyText}`);
    }

    const payload = await res.json();
    if (!payload?.id) throw new Error(payload.message);
    return payload.id as string;
}


export async function fetchTranscriptions(): Promise<Transcription[]> {
    const res = await fetch(`${API_BASE}/list_all`);
    if (res.status === 404) {
        throw new Error('Endpoint GET /transcriptions not found on backend.');
    }

    if (!res.ok) {
        const bodyText = await res.text();
        throw new Error(`Server error: ${res.status} ${bodyText}`);
    }

    const data = await res.json();

    return data as Transcription[];
}