import { Hotel, Room } from "@prisma/client";
import React from "react";
import { HotelWithRooms } from "../Hotel/AddHotelForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddRoomForm {
  hotel?: HotelWithRooms;
  room?: Room;
  handleDialogOpen: () => void;
}

const AddRoomForm = ({ hotel, room, handleDialogOpen }: AddRoomForm) => {
  const formSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be atleast 3 characters long" }),
    description: z
      .string()
      .min(10, { message: "Description must be atleast 10 characters long" }),
    bedCount: z.coerce.number().min(1, { message: "Bed count is required" }),
    guestCount: z.coerce
      .number()
      .min(1, { message: "Guest count is required" }),
    bathrooomCount: z.coerce
      .number()
      .min(1, { message: "Bathroom count is required" }),
    kignBed: z.coerce.number().min(0),
    queenBed: z.coerce.number().min(0),
    image: z.string().min(1, { message: "Image is Required" }),
    breakFastPrice: z.coerce.number().optional(),
    roomPrice: z.coerce.number().min(1, { message: "Room price is required" }),
    roomService: z.boolean().optional(),
    TV: z.boolean().optional(),
    balcony: z.boolean().optional(),
    freeWifi: z.boolean().optional(),
    cityView: z.boolean().optional(),
    oceanView: z.boolean().optional(),
    forestView: z.boolean().optional(),
    mountainView: z.boolean().optional(),
    airCondition: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      guestCount: 0,
      bathrooomCount: 0,
      kignBed: 0,
      queenBed: 0,
      image: "",
      breakFastPrice: 0,
      roomPrice: 0,
      roomService: false,
      TV: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
    },
  });

  return <div className="max-h-[75vh] overflow-y-auto px-2">AddRoomForm</div>;
};

export default AddRoomForm;
