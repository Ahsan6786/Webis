import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamContent from "@/components/team/TeamContent";

export const metadata: Metadata = {
  title: "Meet the Team — The Architects of Digital Excellence",
  description: "Webis is a collective of visionary builders, creative designers, and growth strategists. Meet the team transforming ideas into high-performance digital realities.",
  openGraph: {
    title: "Meet the Team | Webis Digital Agency",
    description: "The architects behind your next digital masterpiece. Meet the Webis team.",
    url: "https://webiss.shop/team",
  }
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <TeamContent />
      <Footer />
    </>
  );
}
