import { NextResponse } from "next/server";

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  return handler(req, ctx);
}
export async function POST(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  return handler(req, ctx);
}
export async function PUT(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  return handler(req, ctx);
}
export async function DELETE(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  return handler(req, ctx);
}

async function handler(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;

  const base = process.env.PHP_API_URL;
  if (!base) {
    return NextResponse.json({ error: "PHP_API_URL não definido" }, { status: 500 });
  }

  const url = new URL(req.url);
  const target = `${base}/${path.join("/")}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const method = req.method;
  const hasBody = method !== "GET" && method !== "HEAD";

  const resp = await fetch(target, {
    method,
    headers,
    body: hasBody ? await req.text() : undefined,
  });

  const body = await resp.text();
  const contentType = resp.headers.get("content-type") || "application/json";

  return new NextResponse(body, {
    status: resp.status,
    headers: { "content-type": contentType },
  });
}