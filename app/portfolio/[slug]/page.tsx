import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ArrowLeft, TrendingUp, Tag, ArrowRight, 
  ExternalLink, Search
} from "lucide-react";
import { projects } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found — Webis" };
  return {
    title: `${project.title} — Webis Portfolio`,
    description: project.description,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Webis`,
      description: project.description,
      url: `https://webiss.shop/portfolio/${slug}`,
      images: [
        {
          url: project.image || "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const gradientMap: Record<string, string> = {
  "from-amber-400 to-orange-500": "linear-gradient(135deg, #FBBF24, #F97316)",
  "from-rose-400 to-pink-500": "linear-gradient(135deg, #FB7185, #EC4899)",
  "from-violet-400 to-indigo-500": "linear-gradient(135deg, #A78BFA, #6366F1)",
  "from-emerald-400 to-cyan-500": "linear-gradient(135deg, #34D399, #06B6D4)",
  "from-sky-400 to-blue-500": "linear-gradient(135deg, #38BDF8, #3B82F6)",
  "from-fuchsia-400 to-rose-400": "linear-gradient(135deg, #E879F9, #FB7185)",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const gradient = gradientMap[project.gradient];
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        {/* Hero banner */}
        {project.image ? (
          <div className="w-full flex justify-center bg-transparent mt-12 mb-8 px-4 sm:px-8">
            <div className="w-full max-w-[1100px] rounded-xl sm:rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)", border: "1px solid var(--border-subtle)", aspectRatio: "16/9" }}>
              <Image 
                src={project.image} 
                alt={project.title} 
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="1100px"
              />
            </div>
          </div>
        ) : (
          <div
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{ height: "50vh", minHeight: "360px", background: gradient }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
              }}
            />
            <div className="relative z-10 text-center px-6">
              <span
                className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-white mb-4"
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                {project.category}
              </span>
              <h1
                className="font-black text-white tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.1 }}
              >
                {project.title}
              </h1>
              <div
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl font-bold text-white"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                <TrendingUp size={16} />
                ↑{project.stats.increase} {project.stats.metric}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mx-auto px-6 py-16" style={{ maxWidth: "860px" }}>
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors hover:text-white"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>

          {/* Content Block — Dynamic Mockup Rendering */}
          {project.mockupConfig ? (
            <div className="mb-16">
              <div
                className="rounded-2xl p-6 sm:p-8 mb-10 text-center"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <h2 className="font-bold text-xl mb-4" style={{ color: "var(--text-primary)" }}>
                  The Digital Experience
                </h2>
                <p className="leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
                  {project.longDescription}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                  {project.websiteUrl && (
                    <a 
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary inline-flex items-center gap-2"
                      style={{ padding: "0.75rem 1.5rem" }}
                    >
                      Visit Live Website <ExternalLink size={16} />
                    </a>
                  )}

                  {project.mockupConfig.googleRanking && (
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                      style={{ 
                        background: "rgba(34, 197, 94, 0.1)", 
                        color: "#22c55e",
                        border: "1px solid rgba(34, 197, 94, 0.2)"
                      }}
                    >
                      <Search size={14} />
                      Ranking #1 on Google
                    </div>
                  )}
                </div>
              </div>

               {/* Full Mockup Frame */}
              <div className="flex flex-col items-center w-full px-2 sm:px-0 mt-12">
                <div 
                  className="w-full max-w-[1100px] flex flex-col rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.002]" 
                  style={{ 
                    boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 120px ${project.mockupConfig.glowColor}`,
                    border: "1px solid var(--border-subtle)" 
                  }}
                >
                  {/* Browser Bar */}
                  <div className="w-full h-11 bg-[#e8e6e1] dark:bg-[#16161b] border-b border-[var(--border-subtle)] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className="flex-1 h-6 flex items-center justify-center mx-4 rounded-md bg-black/10 dark:bg-white/5 opacity-80 overflow-hidden max-w-[300px] relative">
                      <span className="text-[10px] font-medium text-black/60 dark:text-white/60 tracking-wider">
                        {project.mockupConfig.url}
                      </span>
                    </div>
                  </div>
                  
                  {/* Stitched Landing Page Preview */}
                  <div className="flex flex-col w-full leading-[0] font-[0px] overflow-hidden bg-black object-cover">
                    {Array.from({ length: project.mockupConfig.count }).map((_, i) => {
                      const fileName = project.mockupConfig?.sequenceStyle === "alphabet" 
                        ? String.fromCharCode(97 + i) 
                        : (i + 1).toString();
                      
                      return (
                        <div key={i} className="w-full relative m-0 p-0 leading-none flex border-none" style={{ aspectRatio: "1920/1080" }}>
                          <Image 
                            src={`${project.mockupConfig?.folder}/${project.mockupConfig?.prefix}${fileName}${project.mockupConfig?.suffix}`} 
                            alt={`${project.title} Experience Part ${i + 1}`} 
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="1100px"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl p-8 mb-10"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h2
                className="font-bold text-xl mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                About This Project
              </h2>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.longDescription}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/#contact"
              className="btn btn-primary inline-flex"
            >
              Start a Similar Project <ArrowRight size={15} />
            </Link>
            <Link
              href="/#portfolio"
              className="btn btn-secondary inline-flex"
            >
              More Projects
            </Link>
          </div>

          {/* Prev / Next navigation */}
          {(prevProject || nextProject) && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-10"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              {prevProject ? (
                <Link
                  href={`/portfolio/${prevProject.slug}`}
                  className="group flex flex-col gap-1 p-5 rounded-2xl transition-all duration-200"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    <ArrowLeft size={12} /> Previous
                  </span>
                  <span className="font-semibold text-sm group-hover:text-white transition-colors" style={{ color: "var(--text-secondary)" }}>
                    {prevProject.title}
                  </span>
                </Link>
              ) : <div />}
              {nextProject && (
                <Link
                  href={`/portfolio/${nextProject.slug}`}
                  className="group flex flex-col gap-1 p-5 rounded-2xl text-right transition-all duration-200 sm:items-end"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="text-xs flex items-center gap-1 justify-end" style={{ color: "var(--text-muted)" }}>
                    Next <ArrowRight size={12} />
                  </span>
                  <span className="font-semibold text-sm group-hover:text-white transition-colors" style={{ color: "var(--text-secondary)" }}>
                    {nextProject.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
