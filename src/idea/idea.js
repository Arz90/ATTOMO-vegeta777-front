import axios from 'axios';
const API_URL = 'http://localhost:5000/api'; // Actualiza esto según tu configuración

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
    try {
      const response = await axios.post(`${API_URL}/games/${gameId}/votes`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error voting for game:', error.response ? error.response.data : error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
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






  // Función para votar por un juego
export const voteGame = async (gameId) => {
    try {
      const response = await axios.post(`${API_URL}/games/${gameId}/vote`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error voting for game:', error.response ? error.response.data : error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  };
  


  const handleVote = async (gameId) => {
    try {
      const response = await voteGame(gameId);
      if (response.status === 200) {
        // Actualizar los juegos localmente sin volver a llamar a getAllGames
        const updatedGames = games.map((game) =>
          game._id === gameId ? { ...game, votes: game.votes + 1 } : game
        );
        setGames(updatedGames);
        setFilteredGames(updatedGames);
      }
    } catch (err) {
      setError("Failed to vote for the game");
      console.error("Error voting for game:", err);
    }
  };