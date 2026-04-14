import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://webiss.shop"),
  title: {
    default: "Best Website Developer in Pune | Top Website Maker in India — Webis",
    template: "%s | Best Web Development Agency"
  },
  description:
    "Webis is the best website developer in Pune and building high-performance websites across India. We are a premium digital agency specializing in Next.js, portfolios, and custom web apps. Starting at ₹2,999.",
  keywords: [
    "best website developer in pune", "top website maker in india", "web design agency pune", 
    "pune web development company", "affordable website design india", "next.js developer india",
    "premium digital agency", "business website maker", "portfolio developer pune", 
    "restaurant website design pune", "e-commerce developer india", "best web agency pune",
    "website development services pune", "ui/ux design agency india", "custom web applications pune",
    "digital marketing pune", "seo experts pune", "web design company in kothrud", 
    "web development in baner", "hinjewadi web services", "viman nagar web designers",
    "best technology partner india", "startup website developer", "enterprise web solutions india",
    "low cost website developer pune", "high end web design pune", "webis digital agency",
    "website branding company pune", "responsive web design india", "mobile app developer pune"
  ],
  authors: [{ name: "Webis Digital Agency" }],
  creator: "Webis",
  openGraph: {
    title: "Best Website Developer in Pune | Top Website Maker in India",
    description:
      "We don't build websites. We build experiences. The best web development agency in Pune for businesses, portfolios, and startups.",
    url: "https://webiss.shop",
    siteName: "Webis Digital",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Webis Digital Agency - Best Web Developer in Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Website Developer in Pune | Webis Digital",
    description: "Premium digital agency building stunning websites starting at ₹2,999. Best website maker in India.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Webis Digital Agency",
              "image": "https://webiss.shop/logo.png",
              "@id": "https://webiss.shop",
              "url": "https://webiss.shop",
              "telephone": "+91-9162248786",
              "priceRange": "₹2999 - ₹99999",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pune, Maharashtra",
                "addressLocality": "Pune",
                "postalCode": "411001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.5204,
                "longitude": 73.8567
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "21:00"
              },
              "sameAs": [
                "https://www.instagram.com/webis001",
                "https://www.linkedin.com/company/webis-digital",
                "https://webiss.shop"
              ],
              "description": "The best website developer in Pune and top website maker in India. Specializing in high-performance Next.js websites for businesses, portfolios, and startups."
            })
          }}
        />
      </head>
      <body className="antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
