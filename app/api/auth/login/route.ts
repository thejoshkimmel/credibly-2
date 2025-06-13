import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log('Login API route called');
  // MongoDB and authentication logic removed
  return NextResponse.json({ error: "MongoDB/mongoose related code removed" }, { status: 501 });
} 