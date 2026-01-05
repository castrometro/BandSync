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

export interface Album {
  id: string;
  title: string;
  releaseDate?: string;
  coverArt?: string;
  description?: string;
}

export interface Link {
  id: string;
  label: string;
  url: string;
  type: 'spotify' | 'drive' | 'youtube' | 'other';
}

export type SongStatus = 'Idea' | 'Demo' | 'Polishing' | 'Ready';
export type SongType = 'Original' | 'Cover';

export interface Song {
  id: string;
  title: string;
  status: SongStatus;
  type: SongType;
  bpm?: number;
  key?: string;
  lyrics?: string;
  albumId?: string;        // Reference to Album ID
  originalArtist?: string; // If it is a cover
  duration?: string;
  links?: Link[];
  notes?: string;
}

export interface AIResponse {
  text: string;
  suggestions?: string[];
}