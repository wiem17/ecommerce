// useAppApi.js
import { useState } from 'react';
import Axios from 'axios';

export const useAppApi = () => {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const signup = async ({ name, lastname, age, email, password }) => {
    try {
      const response = await Axios.post('http://localhost:3001/user/register', {
        name,
        lastname,
        age,
        email,
        password,
      });

      // Si la création de l'utilisateur réussit, mettez à jour l'état de l'utilisateur
      setUser(response.data);
      console.log('User created successfully:', response.data);
    } catch (error) {
      
      setIsError(true);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await Axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      // Si la connexion réussit, mettez à jour l'état de l'utilisateur
      setUser(response.data);
      console.log('Login successful:', response.data);

      // Vous pouvez également retourner des données utiles si nécessaire
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);

      // Mise à jour de l'état pour indiquer une erreur
      setIsError(true);

      // Vous pouvez également retourner des données utiles en cas d'erreur
      return { error: 'Login failed' };
    }
  };

  const logout = () => {
    // Déconnexion : réinitialisez l'état de l'utilisateur à null
    setUser(null);
  };

  return { user, isError, signup, login, logout };
};
