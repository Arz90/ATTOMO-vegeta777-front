import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userService';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    try {
      await registerUser({ username, password });
      alert('Registered successfully');
      setError('');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleRegister} style={{ width: '300px' }}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
