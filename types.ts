export enum EventType {
  REHEARSAL = 'Ensayos',
  GIG = 'Show / Toque',
  RECORDING = 'Grabación',
  LISTENING = 'Escucha',
  MEETING = 'Reunión'
}

export enum MemberRole {
  VOCALS = 'Voz',
  GUITAR = 'Guitarra',
  BASS = 'Bajo',
  DRUMS = 'Batería',
  KEYS = 'Teclados',
  MANAGER = 'Manager'
}

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  avatar: string;
  personalGoals: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO String
  type: EventType;
  location: string;
  objective: string;
  attendees: string[]; // Member IDs
}

export interface Song {
  id: string;
  title: string;
  status: 'Idea' | 'Demo' | 'Polishing' | 'Ready';
  bpm?: number;
  key?: string;
  lyrics?: string;
}

export interface AIResponse {
  text: string;
  suggestions?: string[];
}