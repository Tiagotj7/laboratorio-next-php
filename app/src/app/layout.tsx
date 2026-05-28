import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAB: NEXT & PHP",
  description: "Um simples projeto para testar o Next.js com backend em PHP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="PT-BR"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
