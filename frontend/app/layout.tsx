import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // Import our new Navbar

export const metadata: Metadata = {
  title: "OctoHub - GitHub Analytics Client",
  description: "A specialized monorepo system tracking user progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* This injects the top bar globally */}
        {children}
      </body>
    </html>
  );
}