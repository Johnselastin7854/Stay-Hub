import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) return new NextResponse("User not authorized", { status: 401 });

  const body = await req.json();
  try {
    const room = await prismadb.room.create({
      data: { ...body },
    });

    return NextResponse.json(room);
  } catch (err) {
    console.error("Error Creating Room", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
