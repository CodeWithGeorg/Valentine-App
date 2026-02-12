import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Valentine Page - Send Anonymous Love Messages",
  description:
    "Create your personalized Valentine page and receive anonymous love messages from friends, crushes, or partners through a shareable link.",
  keywords: [
    "valentine",
    "anonymous",
    "love messages",
    "valentine app",
    "crush messages",
  ],
  openGraph: {
    title: "My Valentine Page",
    description: "Create your personalized Valentine page",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200`}
      >
        {children}
      </body>
    </html>
  );
}
