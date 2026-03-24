import { useState } from 'react';

export default function ITDashboard() {
  const [allTickets, setAllTickets] = useState([
    { id: 1, problem: 'Printer jammed', user: 'bob@work.com' },
    { id: 2, problem: 'Password reset', user: 'sarah@work.com' }
  ]);
  
  const [myTickets, setMyTickets] = useState([]);

  //add GET api to fetch unassigned tickets and tickets currently assigned to IT worker

  const assignToMe = (ticket) => {
    setAllTickets(allTickets.filter(t => t.id !== ticket.id));
    setMyTickets([...myTickets, { ...ticket, status: 'Open' }]);
    //add PUT api here to update ticket to be assigned to worker
  };

  const closeTicket = (id) => {
    setMyTickets(myTickets.map(t => 
      t.id === id ? { ...t, status: 'Closed' } : t
    ));
    //add PUT api here to update ticket to be closed
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-bold">IT Dashboard</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-zinc-500">Unassigned Tickets</h2>
          {allTickets.map(ticket => (
            <div key={ticket.id} className="flex justify-between items-center border border-zinc-800 p-4 rounded-md bg-zinc-900">
              <div>
                <div>{ticket.problem}</div>
                <div className="text-zinc-500 text-sm">{ticket.user}</div>
              </div>
              <button 
                onClick={() => assignToMe(ticket)}
                className="bg-zinc-800 text-sky-400 px-4 py-2 rounded-md font-bold">
                Assign
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-sky-400">My Workspace</h2>
          {myTickets.map(ticket => (
            <div key={ticket.id} className="flex justify-between items-center border border-zinc-800 p-4 rounded-md bg-zinc-900">
              <div>
                <div>{ticket.problem}</div>
                <div className="text-zinc-500 text-sm">{ticket.user}</div>
              </div>
              <div className="flex gap-4 items-center">
                <span className={ticket.status === 'Closed' ? 'text-zinc-500' : 'text-sky-400'}>
                  {ticket.status}
                </span>
                {ticket.status !== 'Closed' && (
                  <button 
                    onClick={() => closeTicket(ticket.id)}
                    className="bg-sky-400 text-zinc-950 px-4 py-2 rounded-md font-bold">
                    Close Ticket
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}