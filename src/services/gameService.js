/* import axios from 'axios';

const API_URL = 'http://localhost:5000/api/games';

export const getAllGames = () => axios.get(API_URL);

export const createGame = (gameData) => axios.post(API_URL, gameData); */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Actualiza esto según tu configuración

// Función para obtener todos los juegos
export const getAllGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error; // Maneja el error de manera adecuada
  }
};

// Función para votar por un juego
export const voteGame = async (gameId) => {
  const token = localStorage.getItem('token'); // Recuperar token desde localStorage
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post(
      `${API_URL}/games/${gameId}/vote`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error voting for game:', error.response ? error.response.data : error);
    throw error;
  }
};
// Función para crear un juego (opcional)
export const createGame = async (gameData) => {
  try {
    const response = await axios.post(`${API_URL}/games`, gameData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};
