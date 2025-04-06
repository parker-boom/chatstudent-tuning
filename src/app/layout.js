import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata for social cards, SEO, favicon, and sharing
export const metadata = {
  title: "Student Tuner",
  description: "Customize ChatGPT to help you be a better student!",
  metadataBase: new URL("https://studentchat.netlify.app"),
  openGraph: {
    title: "Student Tuner",
    description: "Customize ChatGPT to help you be a better student!",
    url: "https://studentchat.netlify.app",
    siteName: "Student Chat",
    images: [
      {
        url: "https://studentchat.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Customize ChatGPT as a student",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Tuner",
    description: "Customize ChatGPT to help you be a better student!",
    images: ["https://studentchat.netlify.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fallback meta in case dynamic metadata doesn't render */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="theme-color" content="#212121" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-main antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
