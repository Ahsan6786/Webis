"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, TrendingUp, Zap, Wallet, Users, ArrowRight, MessageSquare, ShieldCheck, Globe, Star, Plus, Minus, Copy, CheckCircle2, Loader2, Send, Mail, Briefcase } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Magnetic from "@/components/animations/Magnetic";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ReferralPage() {
  const [referrals, setReferrals] = useState(1);
  const rewardPerReferral = 2000;
  const totalReward = referrals * rewardPerReferral;

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", business: "" });
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);

  const instagramLink = "https://www.instagram.com/webis001?igsh=MWcwMnhoaTk0bXF0dA%3D%3D&utm_source=qr";
  const emailAddress = "mitraai0001@gmail.com";

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456786";
    let code = "WB-";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const code = generateCode();
      
      // Save to Firestore
      await addDoc(collection(db, "referrals"), {
        ...formData,
        code,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      setGeneratedCode(code);
    } catch (error) {
      console.error("Error saving referral:", error);
      alert("Something went wrong. Please check your Firebase rules.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const steps = [
    {
      icon: Users,
      title: "Identify",
      description: "Find businesses that are struggling to scale or have outdated digital presences.",
      color: "#2563eb"
    },
    {
      icon: MessageSquare,
      title: "Refer",
      description: "Introduce them to Webis. We'll take care of the strategy and high-end execution.",
      color: "#7c3aed"
    },
    {
      icon: Wallet,
      title: "Earn",
      description: "Get ₹2,000+ per referral once the project kicks off. No limits on earnings.",
      color: "#10b981"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-20" style={{ background: "var(--bg-primary)" }}>
        
        {/* BACK BUTTON */}
        <div className="container mx-auto px-6 mb-12">
          <ScrollReveal direction="left">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group hover:translate-x-[-4px] transition-transform"
              style={{ color: "var(--brand-primary)" }}
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </ScrollReveal>
        </div>

        {/* HERO SECTION */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl">
            <ScrollReveal direction="up">
              <h1 
                className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter"
                style={{ color: "var(--text-primary)", lineHeight: 0.95 }}
              >
                Help Someone <span className="text-blue-600">Scale</span>. <br />
                Earn while you lead.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
                Join the Webis partner network. Help businesses break through growth ceilings with elite digital experiences and get rewarded for every successful connection.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* THE FORM & STORY SPLIT SECTION */}
        <section className="py-24 mb-24" style={{ background: "rgba(0,0,0,0.02)", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
              
              {/* FORM SECTION */}
              <ScrollReveal direction="left">
                <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-slate-200 shadow-2xl relative overflow-hidden">
                   {/* Background Decor */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 -z-0" />

                   <div className="relative z-10">
                     <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Become a Partner</h3>
                     <p className="text-slate-500 mb-8">Fill in your details to generate your unique referral code.</p>

                     <AnimatePresence mode="wait">
                       {!generatedCode ? (
                         <motion.form 
                          key="form"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          onSubmit={handleSubmit} 
                          className="space-y-6"
                         >
                           <div>
                             <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                             <input 
                              required
                              type="text" 
                              placeholder="John Wick"
                              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-semibold"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                             />
                           </div>
                           <div>
                             <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                             <input 
                              required
                              type="email" 
                              placeholder="john@example.com"
                              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-semibold"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                             />
                           </div>
                           <div>
                             <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Social Link / Business Name</label>
                             <input 
                              required
                              type="text" 
                              placeholder="Your Instagram or Company"
                              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-semibold"
                              value={formData.business}
                              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                             />
                           </div>
                           
                           <Magnetic>
                             <button 
                              disabled={loading}
                              type="submit" 
                              className="btn btn-primary w-full py-5 text-lg font-black flex items-center justify-center gap-3"
                             >
                               {loading ? <Loader2 className="animate-spin" /> : "Generate My Code"}
                               {!loading && <Zap size={20} className="fill-current" />}
                             </button>
                           </Magnetic>
                         </motion.form>
                       ) : (
                         <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-left"
                         >
                           <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                             <CheckCircle2 size={32} className="text-green-600" />
                           </div>
                           <h4 className="text-2xl font-black text-slate-900 mb-2">Code Generated Successfully!</h4>
                           <p className="text-slate-500 mb-8 font-medium">Your unique partner code is ready. Follow the steps below to make it reliable.</p>
                           
                           <div 
                            className="bg-slate-900 text-white p-8 rounded-3xl relative group cursor-pointer overflow-hidden border-2 border-slate-800 mb-10"
                            onClick={copyToClipboard}
                           >
                             <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                               <Copy size={20} />
                             </div>
                             <span className="text-sm font-bold text-blue-400 uppercase tracking-[0.3em] block mb-2 text-center">Click to Copy Partner ID</span>
                             <span className="text-5xl font-black tracking-widest block text-center tabular-nums">{generatedCode}</span>
                             
                             <AnimatePresence>
                               {copying && (
                                 <motion.div 
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -20, opacity: 0 }}
                                  className="absolute inset-0 bg-blue-600 flex items-center justify-center font-black text-xl"
                                 >
                                   Copied to Clipboard!
                                 </motion.div>
                               )}
                             </AnimatePresence>
                           </div>

                           {/* RELIABILITY STEPS */}
                           <div className="space-y-6 pt-6 border-t border-slate-100 mb-10">
                              <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs">Further Process (Essential)</h5>
                              <div className="flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 font-black text-xs">1</div>
                                 <p className="text-sm text-slate-600 leading-relaxed font-medium">Give this code to the business you are referring. It links them to you.</p>
                              </div>
                              <div className="flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 font-black text-xs">2</div>
                                 <p className="text-sm text-slate-600 leading-relaxed font-medium"><strong>Notify us immediately</strong> on Instagram or Email with the code and business name.</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <a 
                                href={instagramLink} 
                                target="_blank" 
                                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-900 text-white font-black text-sm hover:bg-blue-600 transition-colors"
                              >
                                <InstagramIcon size={18} /> Instagram DM
                              </a>
                              <a 
                                href={`mailto:${emailAddress}?subject=New Referral Code: ${generatedCode}`}
                                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-black text-sm hover:border-blue-600 transition-colors"
                              >
                                <Mail size={18} /> Send Email
                              </a>
                           </div>

                           <button 
                            onClick={() => setGeneratedCode(null)}
                            className="mt-10 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest block mx-auto"
                           >
                             Generate another code
                           </button>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                </div>
              </ScrollReveal>

              {/* STORY SECTION */}
              <ScrollReveal direction="right">
                <div className="max-w-xl py-6">
                  <SectionHeading 
                    align="left"
                    label="The Solution"
                    title="Not able to scale?"
                    titleHighlight="Try Webis."
                    subtitle="We don't just build sites; we build growth machines. When you refer a business to us, you're not just 'suggesting a vendor' — you're handing them the keys to a new level of success."
                  />
                  
                  <div className="mt-12 space-y-10">
                    {[
                      { icon: ShieldCheck, title: "Industry-Leading Trust", text: "We build premium experiences that command authority and convert visitors into loyal clients." },
                      { icon: Globe, title: "Global Reach", text: "From local SEO to international performance optimization, we make businesses visible everywhere." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
                          <item.icon size={26} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                          <p className="text-slate-500 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-14 p-6 rounded-2xl bg-white border border-slate-200 border-l-4 border-l-blue-600 italic text-slate-600 font-medium font-serif text-lg">
                    "If they can't see the quality of your brand, they won't buy the quality of your product. Webis fixes that."
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SMART COMPONENT: REWARD ESTIMATOR */}
        <section className="container mx-auto px-6 mb-32">
          <div className="max-w-5xl mx-auto rounded-[48px] p-10 lg:p-20 text-center border border-slate-200 bg-white shadow-xl">
             <ScrollReveal direction="up">
               <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Potential Earnings <span className="text-blue-600">Estimator</span></h2>
               <p className="text-slate-500 mb-12 max-w-xl mx-auto">See how much you can earn by helping your network scale with Webis.</p>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
                 {/* Referral Input */}
                 <div className="space-y-6">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Monthly Referrals</p>
                   <div className="flex items-center gap-6 justify-center">
                     <button 
                      onClick={() => setReferrals(Math.max(1, referrals - 1))}
                      className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-blue-600 transition-colors"
                     >
                       <Minus size={24} className="text-slate-900" />
                     </button>
                     <span className="text-7xl font-black text-slate-900 w-24 tabular-nums">{referrals}</span>
                     <button 
                      onClick={() => setReferrals(referrals + 1)}
                      className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-blue-600 transition-colors"
                     >
                       <Plus size={24} className="text-slate-900" />
                     </button>
                   </div>
                 </div>

                 {/* Vertical Divider (Desktop) */}
                 <div className="hidden md:block w-px h-32 bg-slate-100" />

                 {/* Reward Output */}
                 <div className="space-y-4">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Estimated Earnings</p>
                   <div className="flex flex-col items-center">
                      <span className="text-7xl lg:text-8xl font-black text-blue-600 tracking-tighter tabular-nums">₹{(totalReward).toLocaleString()}</span>
                      <span className="text-slate-400 font-bold text-sm mt-2">Plus performance bonuses*</span>
                   </div>
                 </div>
               </div>
             </ScrollReveal>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className="container mx-auto px-6 mb-32">
          <SectionHeading 
            label="The Process"
            title="Three Steps to"
            titleHighlight="Partner Success"
            className="mb-16"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                 <div className="p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group h-full">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: step.color }}
                    >
                      <step.icon size={30} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{step.description}</p>
                    
                    <div className="mt-10 flex items-center gap-2 text-xs font-bold text-slate-300 tracking-widest uppercase">
                       <span>Phase 0{i + 1}</span>
                       <div className="h-px flex-1 bg-slate-200" />
                    </div>
                 </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="container mx-auto px-6">
           <ScrollReveal direction="up">
             <div className="rounded-[56px] p-10 lg:p-24 bg-slate-900 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-blue-600/10 blur-[120px] pointer-events-none" />
                
                <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                  The future of scale <br /> starts with a <span className="text-blue-500">referral.</span>
                </h2>
                
                <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                  Join a network of visionary builders. Help other businesses thrive and build your own passive income stream today.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                   <Magnetic>
                    <a 
                      href="https://wa.me/919162248786?text=Hi%20Webis,%20I'm%20ready%20to%20join%20the%20Partner%20Program." 
                      className="bg-white text-slate-950 px-12 py-5 rounded-full text-xl font-black hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3"
                    >
                      Get Started Now <ArrowRight size={20} />
                    </a>
                   </Magnetic>
                </div>
             </div>
           </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
