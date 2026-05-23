import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="bg-ghBg">
      <body className="bg-ghBg antialiased">
        {/* We removed the <Navbar /> tag from here entirely */}
        {children}
      </body>
    </html>
  );
}