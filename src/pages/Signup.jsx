import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup attempt:", { email, password });

    try {
      //POST request with Backend Filler URL
      //This should check if exists in DB and if not add the account to DB
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created, Proceed to Login");
        navigate('/'); 
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">IT Ticketing System</h1>
      <h2 className="text-zinc-500 mb-8">Signup</h2>
      <form onSubmit={handleSignup} className="w-full max-w-sm flex flex-col gap-4">
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
        <button className="bg-sky-400 hover:bg-sky-300 text-zinc-950 font-bold py-3 rounded-md transition-colors">Create Account</button>
      </form>
      <p className="mt-6 text-sm text-zinc-500">Already have an account? <Link to="/" className="text-sky-400 hover:underline">Login</Link>
      </p>
    </div>
  );
}