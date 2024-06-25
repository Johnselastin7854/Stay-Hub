import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  console.log(params.hotelId, "lll");

  const body = await req.json();
  const { userId } = auth();

  if (!params.hotelId) {
    return new NextResponse("hotelId not found", { status: 400 });
  }

  if (!userId) {
    return new NextResponse("User not authorized", { status: 401 });
  }
  try {
    const updateHotel = await prismadb.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: { ...body },
    });

    return NextResponse.json(updateHotel);
  } catch (err) {
    console.log("Error update the hotel", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  const { userId } = auth();
  if (!params.hotelId)
    return new NextResponse("hotelId not found", { status: 404 });

  if (!userId) return new NextResponse("User not authorized", { status: 401 });
  try {
    const deleteHotel = await prismadb.hotel.delete({
      where: {
        id: params.hotelId,
      },
    });

    return NextResponse.json(deleteHotel);
  } catch (err) {
    console.log("Error Deleting the hotel", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
