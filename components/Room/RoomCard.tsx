"use client";
import React, { useState } from "react";
import { HotelWithRooms } from "../Hotel/AddHotelForm";
import { Booking, Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  Ship,
  Trash,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import AddRoomModal from "./AddRoomModal";
import axios from "axios";
import { useToast } from "../ui/use-toast";

interface RoomCardProps {
  hotel?: HotelWithRooms;
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [isRoomDeleting, setIsRoomDeleting] = useState(false);
  const { toast } = useToast();

  const isHotelDetailsPage = pathName.includes("hotel-details");

  const handleDeleteRoom = async (room: Room) => {
    setIsRoomDeleting(true);
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);
    try {
      const imageKey = getImageKey(room.image);
      await axios.post("/api/uploadthing/delete", { imageKey });
      await axios.delete(`/api/room/${room.id}`);
      setIsRoomDeleting(false);
      toast({
        variant: "success",
        description: "Room Deleted",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Hotel Deletion could not be completed",
      });
      setIsRoomDeleting(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" />
            {room.bedCount} {room.bedCount > 1 ? "Bed(s)" : "Bed"}
          </AmenityItem>
          <AmenityItem>
            <Users className="h-4 w-4" />
            {room.guestCount} {room.guestCount > 1 ? "Guest(s)" : "Guest"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" />
            {room.bathrooomCount}{" "}
            {room.bathrooomCount > 1 ? "Bathroom(s)" : "Bathroom"}
          </AmenityItem>

          {!!room.kignBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" />
              {room.kignBed} {room.kignBed > 1 ? "King Bed(s)" : "King Bed"}
            </AmenityItem>
          )}
          {!!room.queenBed && (
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {room.queenBed} {room.queenBed > 1 ? "Queen Bed(s)" : "Queen Bed"}
            </AmenityItem>
          )}
          {room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              Room Services
            </AmenityItem>
          )}
          {room.TV && (
            <AmenityItem>
              <Tv className="h-4 w-4" />
              TV
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" />
              Balcony
            </AmenityItem>
          )}
          {room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" />
              Free Wifi
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              City View
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" />
              Ocean View
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              <Trees className="h-4 w-4" />
              Forest View
            </AmenityItem>
          )}

          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" />
              Mountain View
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" />
              Air Conditioner
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className=" flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs">/24hrs</span>
          </div>
          {!!room.breakFastPrice && (
            <div>
              BreakFast :{" "}
              <span className="font-bold">${room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        {isHotelDetailsPage ? (
          <div>Hotel Details Page</div>
        ) : (
          <div className="w-full flex justify-between ">
            <Button
              variant={"ghost"}
              type="button"
              className="max-w-[150px] "
              disabled={isRoomDeleting}
              onClick={() => handleDeleteRoom(room)}
            >
              {isRoomDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4 " />
                  Delete
                </>
              )}
            </Button>
            {hotel && (
              <AddRoomModal
                title="Edit"
                hotel={hotel}
                modalTitle="Update"
                modalDescription="Make changes to this room"
                room={room}
              />
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
