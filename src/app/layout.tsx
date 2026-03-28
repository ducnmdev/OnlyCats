import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'next-cloudinary/dist/cld-video-player.css';
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import TanStackProvider from "@/providers/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlyCat",
  description: "OnlyCat is a platform for cat lovers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="bottom-right"
            reverseOrder={true}
          />
          <TanStackProvider>
            {children}
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
