import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const response = await axios.post('/api/users/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, role } = response.data;

      console.log('User logged in:', response.data);
      localStorage.setItem('token', token);

      switch (role) {
        case 'Driver':
          navigate('/DriverDashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error('Error logging in user:', err);
      alert('Invalid credentials, please try again');
    }
  };

  return (
    <section className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <input
            type="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <input type="submit" className={styles.formButton} value="Login" />
      </form>
      <p className={styles.formFooter}>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
