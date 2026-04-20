import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LID Academy — Miguel Ángel Jr",
  description:
    "Health and performance coaching for high-performing professionals. Systems, not discipline.",
  openGraph: {
    title: "LID Academy — Miguel Ángel Jr",
    description:
      "Health and performance coaching for high-performing professionals. Systems, not discipline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
