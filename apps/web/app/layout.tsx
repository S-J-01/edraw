import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppBar from "../components/AppBar";
import { ThemeProvider } from "../providers/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "EDRAW",
  description: "A real-time collaborative canvas for Engineers, Designers and Teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <ThemeProvider attribute={"class"} defaultTheme={"light"} >
        <AppBar/>
        {children}
        </ThemeProvider>
      </body>
      
    </html>
  );
}
