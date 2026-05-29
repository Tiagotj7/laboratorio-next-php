"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import ProductDialog, { Product } from "./ProductDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [edit, setEdit] = useState<Product | null>(null);

  const totalItems = useMemo(
    () => products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0),
    [products]
  );

  async function load() {
    setErr(null);
    try {
      const data = await api("/products");
      setProducts(data.products);
    } catch (e: any) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function removeProduct(id: number) {
    if (!confirm("Deseja excluir este produto?")) return;
    setErr(null);
    try {
      await api(`/products/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Estoque</h1>
          <p className="text-sm text-slate-600">
            Gerencie seus produtos (CRUD) com autenticação.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={load}>Atualizar</Button>
          <Button onClick={() => setOpenCreate(true)}>Novo produto</Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Total cadastrados</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{products.length}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itens</CardTitle>
            <CardDescription>Soma das quantidades</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{totalItems}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>API / Autenticação</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">JWT ativo</Badge>
          </CardContent>
        </Card>
      </div>

      {err && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de produtos</CardTitle>
          <CardDescription>Editar e excluir itens do estoque</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70px]">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell className="text-slate-600">{p.sku ?? "-"}</TableCell>
                    <TableCell className="text-right">{p.quantity}</TableCell>
                    <TableCell className="text-right">{p.price}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEdit(p)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => removeProduct(p.id)}>
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-600">
                      Nenhum produto cadastrado ainda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ProductDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        mode="create"
        onSaved={load}
      />

      <ProductDialog
        open={!!edit}
        onOpenChange={(v) => !v && setEdit(null)}
        mode="edit"
        initial={edit}
        onSaved={load}
      />
    </main>
  );
}