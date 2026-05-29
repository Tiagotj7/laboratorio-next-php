import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Controle de estoque com Next.js + PHP
          </h1>
          <p className="text-slate-600">
            Projeto de laboratório com autenticação (JWT) e CRUD de produtos.
            Front moderno e rápido, back em PHP puro.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/products">Ir para o Estoque</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-4 text-sm text-slate-700">
            <div className="font-medium mb-1">Dica</div>
            Faça login e gerencie seus produtos (criar, editar, excluir).
          </div>
        </div>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>O que tem no sistema</CardTitle>
            <CardDescription>Funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>Registro e Login</li>
              <li>JWT no back-end PHP</li>
              <li>CRUD de Produtos (estoque)</li>
              <li>Interface moderna com shadcn/ui</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}