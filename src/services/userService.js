/* import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData); */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Registra un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Devuelve los datos de respuesta, posiblemente para usar en la interfaz
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error);
    throw error;
  }
};

// Inicia sesión y guarda el token
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const { token } = response.data;

    // Guarda el token en localStorage
    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data; // Devuelve los datos de respuesta, posiblemente para usar en la interfaz
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error);
    throw error;
  }
};

// Cierra sesión y elimina el token
export const logoutUser = () => {
  localStorage.removeItem('token');
};

