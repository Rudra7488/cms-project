// frontend/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Full-Stack CMS",
  description: "A CMS built with Next.js and Flask",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-900 text-white p-4 shadow-md">
          <h1 className="container mx-auto text-2xl font-bold">CMS Dashboard</h1>
        </header>
        <main className="container mx-auto p-4 my-6">
          {children}
        </main>
        <footer className="bg-gray-200 text-gray-600 p-4 text-center mt-8">
          <p>© 2025 - Built with Next.js & Flask</p>
        </footer>
      </body>
    </html>
  );
}