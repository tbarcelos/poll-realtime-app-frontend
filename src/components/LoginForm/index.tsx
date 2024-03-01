import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import InputField from '../InputField';
import { extractErrorMessage } from '../../utils/handleApiError';
import Alert from '../Alert';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (e) {
      setError(extractErrorMessage(e));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <Alert>{error}</Alert>}
      <InputField
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        label="Username"
        placeholder="Enter your username"
        change={(e) => setUsername(e.target.value)}
      />
      <InputField
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        label="Password"
        placeholder="Enter your password"
        change={(e) => setPassword(e.target.value)}
      />
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
