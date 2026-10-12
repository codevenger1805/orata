import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected;`;
    return NextResponse.json({
      status: "healthy",
      database: "connected",
      provider: "Supabase PostgreSQL",
      result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database connection error";
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: message,
      },
      { status: 500 }
    );
  }
}
