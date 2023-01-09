import { useState } from 'react';
import Router from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { session, loading } = useSession();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Make a request to your server to verify the email and password
      const response = await axios.post('/api/login', { email, password });
      const user = response.data;

      // Save the authenticated user's information in a server-side session
      // For example, using the express-session library:
      // req.session.user = user;
      // Or, using the next-session library:
      // await session.set({ user });

      // Set a cookie on the client-side to store the authenticated user's information
      document.cookie = `user=${JSON.stringify(user)}; path=/`;

      // Redirect the user to the dashboard or another protected page
      Router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password');
    }
  }

  async function handleLogout(event) {
    event.preventDefault();

    // Clear the authenticated user's information from the server-side session
    // For example, using the express-session library:
    // req.session.destroy();
    // Or, using the next-session library:
    // await session.destroy();

    // Clear the cookie on the client-side
    document.cookie = `user=; expires=${new Date().toUTCString()}; path=/`;

    // Redirect the user to the login page
    Router.push('/login');
  }

  function handleGitHubSubmit(event) {
    event.preventDefault();
    signIn('github');
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <br />
        <input type="submit" value="Log in" />
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!loading && session && (
        <button onClick={handleLogout}>Log out</button>
      )}
      <form onSubmit={handleGitHubSubmit}>
        <button type="submit">Log in with GitHub</button>
      </form>
      {!loading && session && (
        <button onClick={signOut}>Log out</button>
      )}
    </div>
  );
};

export default Login;
