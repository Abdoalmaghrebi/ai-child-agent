'use client';

import { useState, useEffect } from 'react';
import { fetchVoices } from '@/lib/api';
import { VoiceOption } from '@/types';

interface VoiceSelectorProps {
  selectedVoice: string;
  onSelect: (voiceId: string) => void;
}

export default function VoiceSelector({ selectedVoice, onSelect }: VoiceSelectorProps) {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVoices();
  }, []);

  async function loadVoices() {
    try {
      const data = await fetchVoices();
      setVoices(data);
    } catch (err) {
      console.error('Failed to load voices');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-8">جاري تحميل الأصوات...</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {voices.map((voice) => (
        <button
          key={voice.id}
          onClick={() => onSelect(voice.id)}
          className={`p-4 rounded-2xl border-2 transition-all text-right ${
            selectedVoice === voice.id
              ? 'border-primary bg-primary/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: voice.color + '20' }}
            >
              {voice.name.split(' ')[0]}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{voice.name}</h3>
              <p className="text-gray-500 text-sm">{voice.description}</p>
            </div>
            {selectedVoice === voice.id && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
