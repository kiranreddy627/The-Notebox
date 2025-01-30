import AuthForm from './AuthForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();

  const handleSignUpSubmit = async (credentials, navigate) => {
    try {
      const response = await fetch('https://the-notebox-fbuj.vercel.app/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || 'An error occurred'}`);
      }
  
      // Handle success (e.g., redirect or display success message)
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      // Display user-friendly error message
      alert('Sign-up failed: ' + error.message);
    }
  
  };

  return <AuthForm formType="signup" onSubmit={handleSignUpSubmit} />;
};
export default SignUp;
