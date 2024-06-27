"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddRoomForm from "./AddRoomForm";
import { HotelWithRooms } from "../Hotel/AddHotelForm";

type Props = {
  hotel: HotelWithRooms;
};

const AddRoomModal = ({ hotel }: Props) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"outline"} type="button" className="max-w-[150px]">
          <Plus className="mr-2 h-4 w-4" /> Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-[90%]">
        <DialogHeader className="px-2">
          <DialogTitle>Add a Room</DialogTitle>
          <DialogDescription>
            Add a details about a room in your hotel
          </DialogDescription>
        </DialogHeader>
        <AddRoomForm hotel={hotel} handleDialogOpen={handleDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomModal;
