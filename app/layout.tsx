import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://surf-me.vercel.app"),
  title: {
    default: "surf-me | Surf Forecast Dashboard",
    template: "%s | surf-me",
  },
  description: "Modern surf forecasting dashboard to track wave conditions and manage favorite breaks.",
  applicationName: "surf-me",
  keywords: ["surf forecast", "waves", "wind", "surf spots", "supabase", "next.js"],
  openGraph: {
    title: "surf-me | Surf Forecast Dashboard",
    description: "Track wave conditions, browse surf spots, and save your favorite breaks.",
    type: "website",
    siteName: "surf-me",
  },
  twitter: {
    card: "summary_large_image",
    title: "surf-me | Surf Forecast Dashboard",
    description: "Track wave conditions, browse surf spots, and save your favorite breaks.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
