import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPoll, vote } from '../api/poll';
import { LogOut, RefreshCcw, Vote, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const intervalRef = useRef(null);

  const fetchPoll = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getPoll();
      setPolls(data.polls);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch poll', err);
      // INTENTIONAL: NO REDIRECTION ON FAIL DURING POLLING
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll(true);

    // AUTO-REFRESH EVERY 10 SECONDS
    intervalRef.current = setInterval(() => {
      fetchPoll();
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleVote = async (optionId) => {
    setVoting(optionId);
    try {
      await vote(optionId);
      await fetchPoll();
    } catch (err) {
      // INTENTIONAL MISHANDLING: JUST SHOW ALERT
      alert(err.response?.data?.message || 'Vote failed. Token might be expired.');
      // The user remains on the dashboard, and the polling continues even if 401 or 500
    } finally {
      setVoting(null);
    }
  };

  const totalVotes = polls.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.email}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold font-sans">Role: Authenticated Voter</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg transition-colors border border-red-500/50 font-bold"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </header>

      {/* Poll Card */}
      <main className="bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 flex items-center space-x-2 text-slate-500 text-sm">
          {loading ? (
            <RefreshCcw size={16} className="animate-spin text-blue-500" />
          ) : (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Are You Still In?</h1>
          <p className="text-slate-400">Total Votes Cast: <span className="text-blue-400 font-bold">{totalVotes}</span></p>
        </div>

        <div className="space-y-12">
          {polls.map((option) => {
            const percentage = totalVotes > 0 ? (option.count / totalVotes) * 100 : 0;
            return (
              <div key={option.id} className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    {option.label}
                    <span className="ml-4 text-slate-500 text-lg font-medium">{option.count} votes</span>
                  </h3>
                  <span className="text-2xl font-black text-blue-400">{Math.round(percentage)}%</span>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                  />
                </div>

                <button
                  onClick={() => handleVote(option.id)}
                  disabled={voting !== null}
                  className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-black transition-all transform active:scale-95 ${
                    voting === option.id 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-white text-slate-900 hover:bg-blue-50 px-6'
                  }`}
                >
                  {voting === option.id ? (
                    <RefreshCcw size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Vote size={20} />
                      <span>Vote for {option.label}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="text-center text-slate-500 text-sm">
        <p>Polling frequency: Every 10 seconds</p>
        <p className="mt-1 italic">Token expires in 60 seconds. See what happens when it does!</p>
      </footer>
    </div>
  );
};

export default Dashboard;
