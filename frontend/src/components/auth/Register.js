import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: '',
    role: 'Driver',
    company_code: '',
  });

  const { name, username, password, password2, role, company_code } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('A user with this username already exists.');
      } else {
        alert('Failed to register user');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <section className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Sign Up</h1>
      <form className={styles.registerForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="role"
            value={role}
            onChange={onChange}
            className={styles.formSelect}
            required
          >
            <option value="Driver">Driver</option>
            <option value="Super">Super</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Company Code"
            name="company_code"
            value={company_code}
            onChange={onChange}
            className={styles.formInput}
            required
          />
        </div>
        <input type="submit" className={styles.formButton} value="Register" />
      </form>
      <p className={styles.formFooter}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
