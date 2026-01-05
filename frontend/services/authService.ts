import api from './api';

export const login = async (email, password) => {
    const response = await api.post('/token/', { email, password });
    if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        return response.data;
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const getToken = () => {
    return localStorage.getItem('accessToken');
};

export const isAuthenticated = () => {
    return !!getToken();
};
