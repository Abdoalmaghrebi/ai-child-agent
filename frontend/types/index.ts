export interface Persona {
  name: string;
  role: string;
  tone: string;
  rules: string[];
  expertise: string[];
  welcomeMessage: string;
  voiceId: string;
}

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  color: string;
  elevenLabsVoiceId: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  timestamp: Date;
}

export interface ChildAccount {
  id: string;
  displayName: string;
  age: number;
  persona: Persona;
  isActive: boolean;
}
