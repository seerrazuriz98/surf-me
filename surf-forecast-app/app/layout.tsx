import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "surf-forecast-app",
  description: "Personalized surf forecast tracker for favorite breaks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
