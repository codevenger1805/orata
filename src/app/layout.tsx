import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orata — AI Speaking Coach",
  description: "Think fast. Speak clearly. Improve deliberately. Speaking practice studio with interactive roulette and targeted coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fffff9] text-[#1a2b1e] antialiased selection:bg-[#ccebd9] selection:text-[#09160e]">
        {children}
      </body>
    </html>
  );
}
