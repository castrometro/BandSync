import { Member, MemberRole, CalendarEvent, EventType, Song, Album } from './types';

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

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'a1',
    title: 'Neon Dreams EP',
    releaseDate: '2024-06-01',
    description: 'Nuestro primer EP con sonidos sintéticos.'
  },
  {
    id: 'a2',
    title: 'Live at Bar Rock',
    releaseDate: '2023-12-15',
    description: 'Grabación en vivo de fin de año.'
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
  { 
    id: 's1', 
    title: 'Neon Lights', 
    status: 'Ready', 
    type: 'Original',
    bpm: 120, 
    key: 'Am',
    albumId: 'a1',
    lyrics: "[Verso 1]\nLuces de neón en la ciudad\nBuscando algo que no es verdad\nCorriendo lejos de la realidad\n\n[Coro]\nNeon Lights, brillan hoy\nDime a dónde voy\nNeon Lights, sin control\nQuemando como el sol",
    notes: "Cuidado con el tempo en la entrada del segundo coro. El bajo debe entrar con más fuerza.",
    links: [
        { id: 'l1', label: 'Demo v3 (Drive)', url: '#', type: 'drive' },
        { id: 'l2', label: 'Referencia Spotify', url: '#', type: 'spotify' }
    ]
  },
  { 
    id: 's2', 
    title: 'Midnight Drive', 
    status: 'Polishing', 
    type: 'Original',
    bpm: 95, 
    key: 'C',
    albumId: 'a1',
    lyrics: "Manejando a medianoche...",
    notes: "Falta definir el solo de guitarra."
  },
  { 
    id: 's3', 
    title: 'Echoes of You', 
    status: 'Demo', 
    type: 'Original',
    bpm: 110, 
    key: 'G',
    notes: "Estructura tentativa: V1 - C - V2 - C - Puente - C" 
  },
  { 
    id: 's4', 
    title: 'Paranoid', 
    status: 'Ready', 
    type: 'Cover',
    originalArtist: 'Black Sabbath',
    bpm: 160, 
    key: 'Em',
    links: [{ id: 'l3', label: 'Live Version 1970', url: '#', type: 'youtube' }]
  },
  { 
    id: 's5', 
    title: 'Heavy Riff Idea', 
    status: 'Idea', 
    type: 'Original',
    bpm: 140, 
    key: 'Em',
    notes: "Idea surgida en el ensayo del martes. Riff principal en cuerda E grave." 
  }
];

export const APP_NAME = "BandSync";