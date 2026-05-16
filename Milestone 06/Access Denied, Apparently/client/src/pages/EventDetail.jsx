import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Trash2, CheckCircle, ArrowLeft, Calendar, User, Users, Info } from 'lucide-react';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Unauthorized access');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id, navigate]);

    const handleRSVP = async () => {
        try {
            await api.post(`/events/${id}/rsvp`);
            alert('RSVP successful! See you there.');
            const res = await api.get(`/events/${id}`);
            setEvent(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to RSVP');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            try {
                await api.delete(`/events/${id}`);
                navigate('/');
            } catch (err) {
                alert(err.response?.data?.message || 'Access Denied');
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-500 font-medium animate-pulse">Fetching event details...</p>
        </div>
    );
    if (!event) return null;

    const hasRSVPed = event.rsvps?.includes(user?.id);

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
                   <button 
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 flex items-center gap-2 group pr-4"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold text-slate-800">Back to events</span>
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="h-32 bg-blue-600 p-8 flex items-end relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
                             <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-2xl ${
                                event.isCreator ? 'bg-white/90 text-blue-700' : (event.isInvited ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white')
                             }`}>
                                {event.isCreator ? 'EVENT OWNER' : (event.isInvited ? 'GUEST' : 'UNAUTHORIZED')}
                             </span>
                             <span className="text-white/40 text-[10px] font-mono">NODE_HASH: {event.id}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm uppercase tracking-tight">{event.title}</h1>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            
                            <div className="md:col-span-8 space-y-10">
                                <div>
                                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                                        <Info size={16} />
                                        <h2 className="text-xs font-extrabold uppercase tracking-widest leading-none">Description</h2>
                                    </div>
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium">{event.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                                            <Calendar size={16} />
                                            <span className="text-xs font-extrabold uppercase tracking-widest leading-none">Event Date</span>
                                        </div>
                                        <span className="text-xl font-bold text-slate-800">{event.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                                            <Users size={16} />
                                            <span className="text-xs font-extrabold uppercase tracking-widest leading-none">Guests Joined</span>
                                        </div>
                                        <span className="text-xl font-bold text-blue-600">{event.rsvps?.length || 0} People</span>
                                    </div>
                                </div>

                                {/* RSVP Action Footer */}
                                <div className="pt-10 flex flex-col md:flex-row gap-4 items-center border-t border-slate-100">
                                    {/* Broken Flow 5: Buttons shown regardless of permissions in starter */}
                                    <button 
                                        onClick={handleRSVP} 
                                        className="btn-primary w-full md:flex-1 py-4 text-lg font-bold shadow-xl shadow-blue-200"
                                    >
                                        <CheckCircle size={24} /> RSVP for Event
                                    </button>
                                    
                                    <button 
                                        onClick={handleDelete} 
                                        className="btn-danger w-full md:w-auto h-14 md:px-6 shadow-xl shadow-red-200"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                <div className="flex items-center gap-2 text-slate-400 mb-4">
                                    <User size={16} />
                                    <h4 className="text-xs font-extrabold uppercase tracking-widest leading-none">Guest List</h4>
                                </div>
                                <div className="space-y-3">
                                    {event.invitedEmails.length > 0 ? (
                                        event.invitedEmails.map((email, i) => (
                                            <div key={i} className="bg-white border border-slate-100 px-4 py-3 rounded-xl shadow-sm text-sm font-semibold text-slate-700 truncate hover:border-blue-200 transition-colors">
                                                {email}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 text-slate-400 italic text-sm">No guests invited yet</div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
                <p className="mt-8 text-center text-slate-400 text-xs font-bold leading-none tracking-widest">
                    EVENT_MANAGER_SYSTEM_V.1.0_UNCHECKED_ACCESS_ENABLED (STARTER_NODE)
                </p>
            </main>
        </div>
    );
};

export default EventDetail;
