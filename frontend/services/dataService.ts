import api from './api';
import { Member, Song, Album, CalendarEvent } from '../types';

export const getMembers = async (): Promise<Member[]> => {
    const response = await api.get('/users/');
    // Transform backend user to frontend member if needed
    // Backend User: { id, username, email, role, avatar, personal_goals, ... }
    // Frontend Member: { id, name, role, avatar, personalGoals }
    return response.data.map((user: any) => ({
        id: user.id,
        name: user.email.split('@')[0], // Derive display name from email
        roles: user.roles, // list of strings
        avatar: user.avatar,
        personalGoals: user.personal_goals ? user.personal_goals.split(',') : [] // valid if textfield is comma sep, or adjust if it's text
    }));
};

export const getSongs = async (): Promise<Song[]> => {
    const response = await api.get('/songs/');
    // Backend Song: { id, title, status, ... }
    // Frontend Song: matches mostly.
    return response.data.map((song: any) => ({
        ...song,
        albumId: song.album // backend sends album ID or object? Depends on serializer. Assuming ID for now or need to check.
    }));
};

export const getAlbums = async (): Promise<Album[]> => {
    const response = await api.get('/albums/');
    return response.data;
};

export const getEvents = async (): Promise<CalendarEvent[]> => {
    const response = await api.get('/events/');
    return response.data;
};

// Add create/update functions as needed
export const createSong = async (song: Partial<Song>) => {
    return await api.post('/songs/', song);
};

export const updateSong = async (id: string, song: Partial<Song>) => {
    return await api.patch(`/songs/${id}/`, song);
};

export const createEvent = async (event: Partial<CalendarEvent>) => {
    return await api.post('/events/', event);
};
