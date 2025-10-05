import type { Metadata } from "next";
import { Suez_One, Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const suezOne = Suez_One({
  variable: "--font-suez-one",
  subsets: ["latin"],
  weight: "400",
});
const inknutAntiqua = Inknut_Antiqua({
  variable: "--font-inknut-antiqua",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Florcast App",
  description: "Aplicación de predicción de floración",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suezOne.variable} ${inknutAntiqua.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
