import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer ? <Link to="/register">Create your Account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
