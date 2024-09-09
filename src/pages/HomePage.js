import { useState, useEffect } from "react";
import { getAllGames, voteGame } from "../services/gameService";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid2,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
} from "@mui/material";

import "../styles/HomePage.css";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortByVotes, setSortByVotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getAllGames();
        setGames(gamesData || []); // Asegurarse de que siempre sea un array
      } catch (err) {
        setError("Failed to load games");
        console.error("Error fetching games:", err);
        setGames([]); // En caso de error, asegurarse de que `games` sea un array vacío
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    let filtered = games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrar por categoría seleccionada
    if (selectedCategory) {
      filtered = filtered.filter((game) => game.category === selectedCategory);
    }

    // Ordenar por votos
    if (sortByVotes === "asc") {
      filtered.sort((a, b) => a.votes - b.votes);
    } else if (sortByVotes === "desc") {
      filtered.sort((a, b) => b.votes - a.votes);
    }

    setFilteredGames(filtered);
  }, [searchTerm, games, selectedCategory, sortByVotes]);

  const categories = Array.from(new Set(games.map((game) => game.category)));

  // Manejar la acción de votar
  /*  const handleVote = async (gameId) => {
    try {
      const response = await voteGame(gameId);
      if (response.status === 200) {
        // Actualizar el estado local para reflejar los cambios en los votos
        const updatedGames = games.map((game) =>
          game._id === gameId ? { ...game, votes: game.votes + 1 } : game
        );
        setGames(updatedGames);
        setFilteredGames(updatedGames);
      }
    } catch (error) {
      setError('You have reached the maximum number of votes or an error occurred.');
    }
  }; */

  const handleVote = async (gameId) => {
    try {
      const token = localStorage.getItem("token"); // O la fuente correcta del token
      if (!token) {
        throw new Error("No token found");
      }
      const response = await voteGame(gameId, token);
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

  return (
    <div className="background-container">
      <Typography variant="h4" gutterBottom>
        TU TURNO...
      </Typography>
      <Typography variant="h6" gutterBottom>
        SOLO TIENES 5 VOTOS.ÚSALOS BIEN
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Search Games"
        variant="outlined"
        fullWidth
        margin="normal"        
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtrar por categoría */}
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel shrink>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          label="Category"
          renderValue={(selected) => {
            if (selected === "") {
              return <em>Select a Category</em>; // Esto es lo que se mostrará antes de seleccionar algo
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ordenar por votos */}
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel shrink>Sort by Votes</InputLabel>
        <Select
          value={sortByVotes}
          onChange={(e) => setSortByVotes(e.target.value)}
          displayEmpty
          label="Sort by Votes"
          renderValue={(selected) => {
            if (!selected) {
              return <em>Select Sorting Option</em>; // Texto a mostrar antes de seleccionar algo
            }
            // Muestra el valor seleccionado con etiquetas claras
            return selected === "asc" ? "Ascending" : "Descending";
          }}
        >
          {/* Opción para no ordenar */}
          <MenuItem value="">
            <em>No Sorting</em>
          </MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>

      <Grid2 container spacing={3}>
        {filteredGames.map((game) => (
          <Grid2 item xs={12} sm={6} md={4} key={game._id}>
            <Card>
              <CardMedia
                component="img"
                className="card-media"
                image={game.image}
                alt={game.name}
                style={{ objectFit: "cover" }} // Asegura que la imagen se ajuste correctamente
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {game.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Votes: {game.votes}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleVote(game._id)}
                >
                  Vote
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default HomePage;
