"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Compass, 
  PenTool, 
  Layers,
  Sparkles
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Magnetic from "@/components/animations/Magnetic";

export default function TheRealIssue() {
  const steps = [
    {
      icon: Compass,
      title: "Blueprint Research",
      description: "We don't guess. We architect. We analyze your market and ad-algorithms to map out the exact digital path to your revenue.",
      tags: ["Market Insights", "Algorithm Mapping"]
    },
    {
      icon: PenTool,
      title: "Precision Design",
      description: "We are a boutique studio. None of our designs are generic or repeated. Our team hand-picks the perfect, unique aesthetic for your brand.",
      tags: ["Boutique Studio", "Unique Design"]
    },
    {
      icon: Layers,
      title: "Growth Integration",
      description: "High-spec tech meets top-tier SEO. We integrate everything needed to ensure your site isn't just live, but ranking.",
      tags: ["Rank #1 SEO", "Ads Optimized"]
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* REFINED HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
          <ScrollReveal direction="up">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8"
            >
               <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
               The Strategy Gap
            </motion.div>
            
            <h2 className="text-4xl md:text-8xl font-black text-slate-950 tracking-tighter leading-[0.9] mb-10">
              The Real Issue isn't <br /> 
              <span className="block mt-4 md:mt-8 text-green-600">Your Product.</span>
            </h2>
            
            <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto italic font-serif">
              "You have the vision. Most agencies have the template. We have the mould."
            </p>
          </ScrollReveal>
        </div>

        {/* ARCHITECTURAL STEPS */}
        <div className="grid lg:grid-cols-3 gap-1px bg-slate-100 border border-slate-100 rounded-[48px] overflow-hidden shadow-2xl mb-32">
           {steps.map((step, i) => (
             <div key={i} className="bg-white p-10 md:p-14 group hover:bg-slate-50 transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-slate-50 font-black text-8xl -mr-4 -mt-4 group-hover:text-blue-50 transition-colors pointer-events-none">
                  0{i + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center mb-10 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <step.icon size={28} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-950 mb-6 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium mb-10 max-w-[280px]">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-100 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
           ))}
        </div>

        {/* THE MOULDING NARRATIVE - PREMIUM CARD */}
        <ScrollReveal direction="up">
          <div className="bg-slate-950 rounded-[64px] p-8 md:p-24 text-center relative overflow-hidden shadow-3xl">
             {/* Abstract grid background */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
             
             <div className="relative z-10 max-w-4xl mx-auto">
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="flex justify-center gap-3 mb-10"
               >
                 <Sparkles className="text-blue-400" size={24} />
                 <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Hand-Crafted Performance</h4>
               </motion.div>
               
               <h3 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
                 We mould your idea into a <br />
                 <span className="text-blue-500">high-converting</span> machine.
               </h3>
               
               <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-16 px-4">
                 Don't let a generic website kill your scaling potential. We architect the best-fit solution that turns your rough vision into a top-ranking digital entity.
               </p>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <Magnetic>
                   <a 
                    href="#contact"
                    className="group relative bg-white text-slate-950 px-12 py-6 rounded-full text-xl font-black hover:bg-blue-500 hover:text-white transition-all shadow-2xl flex items-center gap-3"
                   >
                     Mould My Vision <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                   </a>
                 </Magnetic>
                 <div className="flex -space-x-4">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 1}`} alt="User" />
                     </div>
                   ))}
                   <div className="w-12 h-12 rounded-full border-4 border-slate-950 bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                     +50
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
