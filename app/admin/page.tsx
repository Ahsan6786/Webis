"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  ArrowRight, 
  LogOut, 
  Calendar, 
  Mail, 
  Briefcase, 
  Hash, 
  RefreshCw,
  ChevronDown,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  TrendingUp
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [referrals, setReferrals] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"referrals" | "leads">("referrals");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "ahsanimamkhan06@gmail.com" && password === "123456") {
      setIsLoggedIn(true);
      setError("");
      // Save session (simple)
      localStorage.setItem("webis_admin_session", "true");
    } else {
      setError("Invalid credentials. Access Denied.");
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("webis_admin_session");
    if (session === "true") setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    
    // Listen to Referrals
    const qRef = query(collection(db, "referrals"), orderBy("createdAt", "desc"));
    const unsubRef = onSnapshot(qRef, (snapshot) => {
      setReferrals(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })));
    });

    // Listen to Contact Leads
    const qLeads = query(collection(db, "contact_leads"), orderBy("createdAt", "desc"));
    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        status: doc.data().status || "pending" // Default for admin view
      })));
      setLoading(false);
    });

    return () => { unsubRef(); unsubLeads(); };
  }, [isLoggedIn]);

  const updateStatus = async (collectionName: string, id: string, status: string) => {
    try {
      await updateDoc(doc(db, collectionName, id), { status });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("webis_admin_session");
  };

  const filteredReferrals = referrals.filter(ref => 
    ref.name?.toLowerCase().includes(search.toLowerCase()) ||
    ref.email?.toLowerCase().includes(search.toLowerCase()) ||
    ref.code?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(search.toLowerCase()) ||
    lead.email?.toLowerCase().includes(search.toLowerCase()) ||
    lead.service?.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-200"
        >
          <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-full -mr-16 -mt-16" />
             <div className="relative z-10">
               <Image src="/logo.png" alt="Logo" width={50} height={50} className="mx-auto mb-4 invert" />
               <h1 className="text-2xl font-black text-white">Admin Gateway</h1>
               <p className="text-slate-400 text-sm">Secure access for Webis Orchestrators</p>
             </div>
          </div>
          
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none transition-all font-semibold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ahsanimamkhan06@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Access Key</label>
              <input 
                type="password" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none transition-all font-semibold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-xs font-bold text-center px-2">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Sidebar / Top Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
           <div className="flex items-center gap-4">
             <Image src="/logo.png" alt="Logo" width={32} height={32} />
             <div className="h-6 w-px bg-slate-200" />
             <h1 className="font-black text-slate-900 tracking-tight">Referral Intelligence</h1>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-slate-400 font-bold text-xs bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Users size={14} /> {referrals.length} Partners Active
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-bold text-sm transition-colors"
              >
                Logout <LogOut size={16} />
              </button>
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        {/* Tab Switcher */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 w-fit mb-8 gap-1 shadow-sm">
           <button 
             onClick={() => setActiveTab("referrals")}
             className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'referrals' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             <Briefcase size={16} /> Partners
           </button>
           <button 
             onClick={() => setActiveTab("leads")}
             className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'leads' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             <Mail size={16} /> Direct Messages
           </button>
        </div>
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
           {(activeTab === 'referrals' ? [
             { label: "Total Referrals", value: referrals.length, icon: Hash, color: "blue" },
             { label: "Pending Review", value: referrals.filter(r => r.status === "pending").length, icon: Clock, color: "amber" },
             { label: "Approved", value: referrals.filter(r => r.status === "approved").length, icon: CheckCircle2, color: "green" },
             { label: "Partner Growth", value: "24%", icon: TrendingUp, color: "indigo" },
            ] : [
             { label: "Total Messages", value: leads.length, icon: Mail, color: "blue" },
             { label: "New Leads", value: leads.filter(l => l.status === "pending").length, icon: Clock, color: "amber" },
             { label: "Contacted", value: leads.filter(l => l.status === "contacted").length, icon: CheckCircle2, color: "green" },
             { label: "Response Rate", value: "98%", icon: TrendingUp, color: "indigo" },
            ]).map((stat, i) => (
             <motion.div 
               key={`${activeTab}-${i}`}
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
               className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
             >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                  stat.color === 'amber' ? 'bg-amber-50 text-amber-600' : 
                  stat.color === 'green' ? 'bg-green-50 text-green-600' : 
                  'bg-indigo-50 text-indigo-600'
                }`}>
                   <stat.icon size={20} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
           <div className="relative flex-1 w-full">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder={activeTab === 'referrals' ? "Search partners..." : "Search leads by name, email or service..."}
               className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-600 outline-none transition-all font-semibold"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <button className="h-14 px-8 rounded-2xl border border-slate-200 font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all w-full md:w-auto justify-center">
              <Filter size={18} /> Filters
           </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
                {activeTab === 'referrals' ? (
                  <>
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Details</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Referral Code</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Submission</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        <tr><td colSpan={5} className="py-20 text-center text-slate-400"><RefreshCw className="animate-spin mx-auto mb-2" /> Syncing...</td></tr>
                      ) : filteredReferrals.length === 0 ? (
                        <tr><td colSpan={5} className="py-20 text-center text-slate-400 italic">No partners found.</td></tr>
                      ) : (
                        filteredReferrals.map((ref) => (
                          <tr key={ref.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-black text-xs uppercase">{ref.name?.substring(0, 2)}</div>
                                  <div>
                                    <h4 className="font-bold text-slate-900">{ref.name}</h4>
                                    <p className="text-xs text-slate-400 flex items-center gap-1"><Mail size={10} /> {ref.email}</p>
                                  </div>
                                </div>
                            </td>
                            <td className="px-8 py-6"><span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-black text-sm tracking-widest border border-blue-100">{ref.code}</span></td>
                            <td className="px-8 py-6">
                                <div className="text-sm">
                                  <p className="font-bold text-slate-700">{ref.createdAt.toLocaleDateString()}</p>
                                  <p className="text-xs text-slate-400">{ref.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <select 
                                  value={ref.status}
                                  onChange={(e) => updateStatus("referrals", ref.id, e.target.value)}
                                  className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border outline-none
                                    ${ref.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : ''}
                                    ${ref.status === 'approved' ? 'bg-green-50 text-green-600 border-green-100' : ''}
                                    ${ref.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : ''}
                                  `}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => alert(`Business/Social: ${ref.business}`)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><ExternalLink size={16} /></button>
                                </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </>
                ) : (
                  <>
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Lead Details</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Service Interest</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Requirement</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        <tr><td colSpan={5} className="py-20 text-center text-slate-400"><RefreshCw className="animate-spin mx-auto mb-2" /> Loading Messages...</td></tr>
                      ) : filteredLeads.length === 0 ? (
                        <tr><td colSpan={5} className="py-20 text-center text-slate-400 italic">No messages found.</td></tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs uppercase">{lead.name?.substring(0, 2)}</div>
                                  <div>
                                    <h4 className="font-bold text-slate-900">{lead.name}</h4>
                                    <p className="text-xs text-slate-400">{lead.email}</p>
                                    <p className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded w-fit mt-1 font-bold">{lead.phone}</p>
                                  </div>
                                </div>
                            </td>
                            <td className="px-8 py-6"><span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-xs uppercase tracking-tight border border-indigo-100">{lead.service}</span></td>
                            <td className="px-8 py-6">
                               <div className="max-w-[240px]">
                                 <p className="text-xs text-slate-600 line-clamp-2 italic">"{lead.message}"</p>
                                 <button onClick={() => alert(lead.message)} className="text-[10px] text-blue-600 font-bold hover:underline mt-1">Read Full Detail</button>
                               </div>
                            </td>
                            <td className="px-8 py-6 font-bold text-slate-700 text-sm whitespace-nowrap">{lead.createdAt.toLocaleDateString()}</td>
                            <td className="px-8 py-6">
                                <select 
                                  value={lead.status}
                                  onChange={(e) => updateStatus("contact_leads", lead.id, e.target.value)}
                                  className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border outline-none
                                    ${lead.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : ''}
                                    ${lead.status === 'contacted' ? 'bg-green-50 text-green-600 border-green-100' : ''}
                                    ${lead.status === 'closed' ? 'bg-slate-100 text-slate-400 border-slate-200' : ''}
                                  `}
                                >
                                  <option value="pending">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="closed">Closed</option>
                                </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </>
                )}
             </table>
           </div>
        </div>
      </div>
    </main>
  );
}
