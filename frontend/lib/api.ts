const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function fetchVoices() {
  const res = await fetch(`${API_URL}/api/speech/voices`);
  return res.json();
}

export async function sendMessage(childId: string, message: string) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ child_id: childId, message }),
  });
  return res.json();
}

export async function synthesizeSpeech(text: string, voiceId: string) {
  const res = await fetch(`${API_URL}/api/speech/synthesize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice_id: voiceId }),
  });
  return res.blob();
}

export async function transcribeSpeech(audioBlob: Blob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  
  const res = await fetch(`${API_URL}/api/speech/transcribe`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function createChild(data: any) {
  const res = await fetch(`${API_URL}/api/parent/children`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
