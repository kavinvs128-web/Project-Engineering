import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Plus, Calendar, LogOut, Search } from 'lucide-react';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const [events, setEvents] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', invitedEmails: '' });

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (err) {
            console.error('Failed to fetch events');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const emails = newEvent.invitedEmails.split(',').map(e => e.trim()).filter(e => e);
            await api.post('/events', { ...newEvent, invitedEmails: emails });
            setShowCreate(false);
            setNewEvent({ title: '', description: '', date: '', invitedEmails: '' });
            fetchEvents();
        } catch (err) {
            alert('Failed to create event. Please ensure all fields are filled correctly.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-blue-600" size={28} />
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">EventManager</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-slate-600 hidden md:inline">Hi, {user?.name}</span>
                        <button onClick={logout} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors text-slate-500">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 leading-none">Your Events</h2>
                        <p className="mt-2 text-slate-500">Events you've created or have been invited to.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreate(!showCreate)}
                        className="btn-primary shadow-lg shadow-blue-200 h-11 px-6 font-bold"
                    >
                        <Plus size={20} /> Create New Event
                    </button>
                </div>

                {showCreate && (
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-blue-100 mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
                        <h3 className="text-xl font-bold mb-6 text-slate-900">Event Details</h3>
                        <form onSubmit={handleCreate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">What's the event called?</label>
                                    <input 
                                        placeholder="Add event name" 
                                        className="input-field" 
                                        required
                                        value={newEvent.title}
                                        onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">When is it happening?</label>
                                    <input 
                                        type="date" 
                                        className="input-field appearance-none cursor-pointer" 
                                        required
                                        value={newEvent.date}
                                        onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Description</label>
                                <textarea 
                                    placeholder="Write something about the event..." 
                                    className="input-field min-h-24 py-3" 
                                    required
                                    value={newEvent.description}
                                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Invite People (by Email, separated by comma)</label>
                                <input 
                                    placeholder="friend@example.com, colleague@example.com" 
                                    className="input-field" 
                                    value={newEvent.invitedEmails}
                                    onChange={e => setNewEvent({...newEvent, invitedEmails: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="btn-primary flex-1 py-3 font-bold">Launch Event</button>
                                <button type="button" onClick={() => setShowCreate(false)} className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <Link to={`/events/${event.id}`} key={event.id} className="card group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 transform hover:-translate-y-1 p-6 relative">
                            <div className="flex items-start justify-between mb-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <Calendar size={18} />
                                </div>
                                <div className="text-xs font-semibold text-slate-400 font-mono tracking-tighter">#{event.id}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors uppercase truncate">{event.title}</h3>
                            <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed mb-6">{event.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-bold text-slate-600">{event.date}</span>
                                </div>
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">Details →</span>
                            </div>
                        </Link>
                    ))}
                    {events.length > 0 && Array.from({ length: 3 - (events.length % 3 === 0 ? 3 : events.length % 3) }).map((_, i) => (
                         <div key={i} className="hidden lg:block group bg-slate-100/30 border-2 border-dashed border-slate-200 rounded-2xl h-full min-h-[160px]"></div>
                    ))}
                </div>
                
                {events.length === 0 && (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl py-24 px-10 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="text-slate-300" size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">No events found</h4>
                        <p className="mt-2 text-slate-500 max-w-sm">Create your first event or wait for someone to send you an invite.</p>
                        <button onClick={() => setShowCreate(true)} className="btn-primary mt-8 h-12 px-10">Start Planning Now</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
