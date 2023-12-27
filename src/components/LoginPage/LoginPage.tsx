import React, { useState, FormEvent, ChangeEvent } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // additional form submission logic
    console.log('Login Attempt:', { username, password });
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold text-gray-700">Login</h1>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
