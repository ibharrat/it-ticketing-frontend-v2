import { useState } from 'react';

export default function UserDashboard() {
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState([]);

  //add GET api to fetch user's existing tickets


  const handleCreateTicket = (e) => {
    e.preventDefault();
    setTickets([{ id: Date.now(), problem, status: 'Open' }, ...tickets]);
    setProblem('');
    setDescription('');

    //add POST api here to add newly created ticket

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
          <button className="bg-sky-400 text-zinc-950 font-bold py-2 rounded-md w-32">Submit</button>
        </form>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-zinc-500">Your Tickets</h2>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex justify-between border border-zinc-800 p-4 rounded-md bg-zinc-900">
              <span>{ticket.problem}</span>
              <span className={ticket.status === 'Open' ? 'text-sky-400' : 'text-zinc-500'}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}