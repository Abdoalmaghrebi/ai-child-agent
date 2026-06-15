import { ElevenLabsClient } from 'elevenlabs';
import dotenv from 'dotenv';

dotenv.config();

export const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// الأصوات الافتراضية
export const VOICE_OPTIONS = [
  { id: 'hero_sea', name: 'بطل البحار 🏴‍☠️', elevenLabsVoiceId: 'XB0fDUnXU5powFXDhCwa' },
  { id: 'happy_sponge', name: 'الإسفنجة المرحة 🧽', elevenLabsVoiceId: 'Xb7hH8MSUJpSbSDYk0k2' },
  { id: 'wise_owl', name: 'البومة الحكيمة 🦉', elevenLabsVoiceId: 'N2lVS1wKmFZrVsEZQNyD' },
  { id: 'brave_lion', name: 'الأسد الشجاع 🦁', elevenLabsVoiceId: 'TX3AE3VoIzMeqNjlmbGe' },
  { id: 'magic_fairy', name: 'الجنية السحرية 🧚‍♀️', elevenLabsVoiceId: 'XB0fDUnXU5powFXDhCwa' },
  { id: 'space_robot', name: 'الروبوت الفضائي 🤖', elevenLabsVoiceId: 'IKne3meq5aSn9XLyUdCD' },
  { id: 'kind_grandma', name: 'الجدة الحنونة 👵', elevenLabsVoiceId: 'XB0fDUnXU5powFXDhCwa' },
];
