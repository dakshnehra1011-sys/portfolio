import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daksh Nehra | Full-Stack & ML Engineer",
  description:
    "Portfolio of Daksh Nehra — Full-Stack Engineer, ML Engineer, and AI Agent Architect. Building intelligent systems and scalable web applications.",
  keywords: [
    "Daksh Nehra",
    "Full-Stack Engineer",
    "ML Engineer",
    "AI Agent",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Daksh Nehra" }],
  openGraph: {
    title: "Daksh Nehra | Full-Stack & ML Engineer",
    description:
      "Portfolio of Daksh Nehra — Full-Stack Engineer, ML Engineer, and AI Agent Architect.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}
