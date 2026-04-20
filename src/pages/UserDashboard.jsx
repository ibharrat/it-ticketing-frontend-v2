import { useState, useEffect } from 'react';

export default function UserDashboard() {
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/my-tickets', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setTickets(data); 
        } else {
          console.error("Failed to fetch tickets");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ problem, description })
      });

      if (response.ok) {
        const newTicket = await response.json();
        setTickets([newTicket, ...tickets]); 
        setProblem('');
        setDescription('');
      } else {
        alert("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error:", error);
      setTickets([{ id: Date.now(), problem, status: 'Open' }, ...tickets]);
      setProblem('');
      setDescription('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        
        <form onSubmit={handleCreateTicket} className="flex flex-col gap-4 border border-zinc-800 p-6 rounded-md bg-zinc-900">
          <h2 className="text-xl text-sky-400">New Ticket</h2>
          <input 
            type="text" 
            placeholder="Problem"
            className="bg-zinc-950 border border-zinc-800 p-3 rounded-md focus:border-sky-400 outline-none"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
          <textarea 
            placeholder="Description"
            className="bg-zinc-950 border border-zinc-800 p-3 rounded-md focus:border-sky-400 outline-none h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="bg-sky-400 text-zinc-950 font-bold py-2 rounded-md w-32 transition-colors hover:bg-sky-300">
            Submit
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-zinc-500">Your Tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-zinc-600 italic">No tickets found.</p>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="flex justify-between items-center border border-zinc-800 p-4 rounded-md bg-zinc-900">
                <span>{ticket.problem}</span>
                <span className={ticket.status === 'Open' ? 'text-sky-400 font-bold text-sm uppercase' : 'text-zinc-500 font-bold text-sm uppercase'}>
                  {ticket.status || 'Open'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}