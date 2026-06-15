export interface Persona {
  name: string;
  role: string;
  tone: string;
  rules: string[];
  expertise: string[];
  welcomeMessage: string;
  voiceId: string;
}

export interface Child {
  id: string;
  parent_id: string;
  display_name: string;
  age: number;
  persona: Persona;
  is_active: boolean;
  daily_limit_minutes: number;
  created_at: string;
}

export interface Message {
  id: string;
  child_id: string;
  role: 'user' | 'assistant';
  content: string;
  audio_url?: string;
  created_at: string;
}

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  color: string;
  elevenLabsVoiceId: string;
}
