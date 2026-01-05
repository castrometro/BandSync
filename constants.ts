import { Member, MemberRole, CalendarEvent, EventType, Song } from './types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Leo',
    role: MemberRole.VOCALS,
    avatar: 'https://picsum.photos/100/100?random=1',
    personalGoals: ['Mejorar rango vocal', 'Escribir letra para nueva balada']
  },
  {
    id: '2',
    name: 'Sofia',
    role: MemberRole.GUITAR,
    avatar: 'https://picsum.photos/100/100?random=2',
    personalGoals: ['Ajustar pedalera', 'Componer solo para Track 3']
  },
  {
    id: '3',
    name: 'Miguel',
    role: MemberRole.DRUMS,
    avatar: 'https://picsum.photos/100/100?random=3',
    personalGoals: ['Practicar con metrónomo a 160bpm']
  },
  {
    id: '4',
    name: 'Ana',
    role: MemberRole.BASS,
    avatar: 'https://picsum.photos/100/100?random=4',
    personalGoals: ['Aprender líneas de bajo del cover nuevo']
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '101',
    title: 'Ensayo General - Setlist A',
    date: new Date(Date.now() + 86400000).toISOString(),
    type: EventType.REHEARSAL,
    location: 'Estudio A, Centro',
    objective: 'Pasar los temas 1 a 5 sin cortar.',
    attendees: ['1', '2', '3', '4']
  },
  {
    id: '102',
    title: 'Sesión de Escucha - Demos',
    date: new Date(Date.now() + 172800000).toISOString(),
    type: EventType.LISTENING,
    location: 'Casa de Leo',
    objective: 'Definir estructura del EP.',
    attendees: ['1', '2', '3', '4']
  },
  {
    id: '103',
    title: 'Show en Bar Rock',
    date: new Date(Date.now() + 604800000).toISOString(),
    type: EventType.GIG,
    location: 'Bar Rock, Av. Principal',
    objective: 'Presentación de 45 minutos.',
    attendees: ['1', '2', '3', '4']
  }
];

export const MOCK_SONGS: Song[] = [
  { id: 's1', title: 'Neon Lights', status: 'Ready', bpm: 120, key: 'Am' },
  { id: 's2', title: 'Midnight Drive', status: 'Polishing', bpm: 95, key: 'C' },
  { id: 's3', title: 'Echoes of You', status: 'Demo', bpm: 110, key: 'G' },
  { id: 's4', title: 'Heavy Riff Idea', status: 'Idea', bpm: 140, key: 'Em' }
];

export const APP_NAME = "BandSync";