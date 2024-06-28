import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/Hotel/AddHotelForm";
import { auth } from "@clerk/nextjs/server";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}

const Hotel = async ({ params }: HotelPageProps) => {
  const { userId } = auth();

  const hotel = await getHotelById(params.hotelId);

  if (!userId) return <p>Not Authenticated ...</p>;

  if (hotel && hotel.userId !== userId) return <p>Access Denied ...</p>;
  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
};

export default Hotel;
