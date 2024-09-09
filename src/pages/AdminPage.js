import { useState } from 'react';
import { createGame } from '../services/gameService';
import { TextField, Button, Box, Typography, Alert, Container } from '@mui/material';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleCreateGame = async (e) => {
    e.preventDefault();
    if (!name || !category || !image) {
      setError('All fields are required');
      return;
    }
    try {
      await createGame({ name, category, image });
      alert('Game created successfully');
      setError('');
      setName('');
      setCategory('');
      setImage('');
    } catch (error) {
      setError('Failed to create game');
    }
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Panel
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleCreateGame} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Game Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Game
        </Button>
      </Box>
    </Container>
  );
};

export default AdminPage;
