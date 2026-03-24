import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    //add POST api here to send credentials and have it get back user's role

  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">IT Ticketing System</h1>
      <h2 className="text-zinc-500 mb-8">Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email"
          className="bg-zinc-900 border border-zinc-800 p-3 rounded-md focus:border-sky-400 outline-none"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          className="bg-zinc-900 border border-zinc-800 p-3 rounded-md focus:border-sky-400 outline-none"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button className="bg-sky-400 hover:bg-sky-300 text-zinc-950 font-bold py-3 rounded-md transition-colors">Login
        </button>
      </form>
      <p className="mt-6 text-sm text-zinc-500">Need an account? <Link to="/signup" className="text-sky-400 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}