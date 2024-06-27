import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  const body = await req.json();
  const { userId } = auth();

  if (!params.roomId) {
    return new NextResponse("roomId not found", { status: 400 });
  }

  if (!userId) {
    return new NextResponse("User not authorized", { status: 401 });
  }
  try {
    const updateRoom = await prismadb.room.update({
      where: {
        id: params.roomId,
      },
      data: { ...body },
    });

    return NextResponse.json(updateRoom);
  } catch (err) {
    console.log("Error update the room", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  const { userId } = auth();
  if (!params.roomId)
    return new NextResponse("roomId not found", { status: 404 });

  if (!userId) return new NextResponse("User not authorized", { status: 401 });
  try {
    const deleteRoom = await prismadb.room.delete({
      where: {
        id: params.roomId,
      },
    });

    return NextResponse.json(deleteRoom);
  } catch (err) {
    console.log("Error Deleting the room", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
