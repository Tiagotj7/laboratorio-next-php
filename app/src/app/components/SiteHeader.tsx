"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { clearToken, getToken } from "../lib/api";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={
        "text-sm font-medium transition-colors " +
        (active ? "text-slate-900" : "text-slate-600 hover:text-slate-900")
      }
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const isLogged = typeof window !== "undefined" && !!getToken();

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Laboratório • Estoque
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink href="/" label="Início" />
          <NavLink href="/products" label="Produtos" />
          {!isLogged ? (
            <>
              <NavLink href="/login" label="Login" />
              <Button asChild size="sm">
                <Link href="/register">Criar conta</Link>
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={logout}>
              Sair
            </Button>
          )}
        </nav>
      </div>
      <Separator />
    </header>
  );
}