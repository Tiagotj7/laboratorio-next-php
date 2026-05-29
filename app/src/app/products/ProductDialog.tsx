"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Product = {
  id: number;
  name: string;
  sku: string | null;
  quantity: number;
  price: string; // vem do backend
};

export default function ProductDialog({
  open,
  onOpenChange,
  mode,
  initial,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "create" | "edit";
  initial?: Product | null;
  onSaved: () => Promise<void> | void;
}) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && initial) {
      setName(initial.name);
      setSku(initial.sku ?? "");
      setQuantity(initial.quantity ?? 0);
      setPrice(Number(initial.price ?? 0));
    } else {
      setName("");
      setSku("");
      setQuantity(0);
      setPrice(0);
    }
  }, [mode, initial, open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const payload = { name, sku: sku || null, quantity, price };

      if (mode === "create") {
        await api("/products", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await api(`/products/${initial?.id}`, { method: "PUT", body: JSON.stringify(payload) });
      }

      await onSaved();
      onOpenChange(false);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Novo produto" : "Editar produto"}</DialogTitle>
          <DialogDescription>Informe os dados do item do estoque.</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>SKU</Label>
            <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="opcional" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Preço</Label>
              <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
          </div>

          {err && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}