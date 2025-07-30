// app/api/assignments/[id]/route.ts
import { Assignment } from "@/lib/models/Assignment";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();

  const update = await Assignment.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  if (!update)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(update);
}
