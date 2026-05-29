import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Laboratório - Estoque",
  description: "CRUD com Login e Estoque (Next + PHP)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50">
        <SiteHeader />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
