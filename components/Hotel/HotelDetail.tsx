import React from "react";
import { HotelWithRooms } from "./AddHotelForm";
import { Booking } from "@prisma/client";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import {
  Bike,
  Car,
  Clapperboard,
  Dumbbell,
  MapPin,
  Utensils,
  Wifi,
  Wine,
} from "lucide-react";
import { FaSpa, FaSwimmer } from "react-icons/fa";
import { MdDryCleaning } from "react-icons/md";
import { CiCoffeeCup } from "react-icons/ci";
import RoomCard from "../Room/RoomCard";

interface HotelDetailProps {
  hotel: HotelWithRooms;
  bookings?: Booking[];
}

const HotelDetail = ({ hotel, bookings }: HotelDetailProps) => {
  const { getCountryByCode, getStateByCode } = useLocation();
  const country = getCountryByCode(hotel.country);
  const state = getStateByCode(hotel.country, hotel.state);

  return (
    <div className=" flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[200px] md:h-[400px] rounded-lg">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold text-xl md:text-3xl">{hotel.title}</h3>
        <div className="font-semibold mt-4">
          <AmenityItem>
            <MapPin className="size-4" />
            {country?.name}, {state?.name},{hotel?.city}
          </AmenityItem>
        </div>
        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details</h3>
        <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <p className="text-primary/90 mb-2">{hotel.description}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">Popular Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm ">
          {hotel.swimmingPool && (
            <AmenityItem>
              <FaSwimmer size={18} /> Pool
            </AmenityItem>
          )}
          {hotel.gym && (
            <AmenityItem>
              <Dumbbell className="size-4" /> Gym
            </AmenityItem>
          )}
          {hotel.spa && (
            <AmenityItem>
              <FaSpa size={18} /> Spa
            </AmenityItem>
          )}
          {hotel.bar && (
            <AmenityItem>
              <Wine className="size-4" /> Bar
            </AmenityItem>
          )}
          {hotel.laundry && (
            <AmenityItem>
              <MdDryCleaning size={18} /> Laundry
            </AmenityItem>
          )}
          {hotel.restaurant && (
            <AmenityItem>
              <Utensils className="size-4" /> Restaurant
            </AmenityItem>
          )}
          {hotel.coffeeShop && (
            <AmenityItem>
              <CiCoffeeCup size={18} /> Coffee Shop
            </AmenityItem>
          )}
          {hotel.freeParking && (
            <AmenityItem>
              <Car className="size-4" /> Free Parking
            </AmenityItem>
          )}
          {hotel.movieNights && (
            <AmenityItem>
              <Clapperboard className="size-4" /> Movie Nights
            </AmenityItem>
          )}
          {hotel.bikeRental && (
            <AmenityItem>
              <Bike className="size-4" /> Bike Rental
            </AmenityItem>
          )}
          {hotel.freeWifi && (
            <AmenityItem>
              <Wifi className="size-4" /> Free Wifi
            </AmenityItem>
          )}
        </div>
      </div>

      {!!hotel.rooms.length && (
        <div>
          <h3 className="font-semibold text-lg mt-4 mb-2">Hotel Rooms</h3>
          <div className="grid grid-cols-1 md:grid-cols2 xl:grid-cols-3 gap-6">
            {hotel.rooms.map((room) => (
              <RoomCard
                hotel={hotel}
                room={room}
                key={room.id}
                bookings={bookings}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
