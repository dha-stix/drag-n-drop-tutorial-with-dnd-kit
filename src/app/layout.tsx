import type { Metadata } from "next";
import { Overpass } from 'next/font/google'
import "./globals.css";

 const overpass = Overpass({
  weight: ["100", "200", '300', '400', '500', '600', "700", '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Suportfix",
  description: "A customer support application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={overpass.className}
      >
        {children}
      </body>
    </html>
  );
}