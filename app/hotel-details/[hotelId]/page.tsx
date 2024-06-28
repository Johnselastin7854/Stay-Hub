import { getHotelById } from "@/actions/getHotelById";
import HotelDetail from "@/components/Hotel/HotelDetail";
import React from "react";

type HotelDetailsProp = {
  params: {
    hotelId: string;
  };
};

const HotelDetails = async ({ params }: HotelDetailsProp) => {
  const hotel = await getHotelById(params.hotelId);

  if (!hotel) return <h2>Oop!. Hotel with the given Id not found</h2>;
  return (
    <div>
      <HotelDetail hotel={hotel} />
    </div>
  );
};

export default HotelDetails;
