import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WX140 | Wix Cycles",
  description:
    "The all-mountain bike that gives up nothing. 140mm of FlowLink travel, ProCarbon frame, and geometry built for every direction the trail goes. WX140 — the mountain bike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
