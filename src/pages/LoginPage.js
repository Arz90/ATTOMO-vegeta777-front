// frontend/src/pages/LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required');
      return;
    }
    try {
      await loginUser({ username, password });
      alert('Logged in successfully');
      setError('');
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLogin} style={{ width: '300px' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
