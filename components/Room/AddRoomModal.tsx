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
import { PencilLine, Plus } from "lucide-react";
import AddRoomForm from "./AddRoomForm";
import { HotelWithRooms } from "../Hotel/AddHotelForm";
import { Room } from "@prisma/client";

type Props = {
  hotel: HotelWithRooms;
  title: string;
  modalTitle: string;
  modalDescription: string;
  room?: Room;
};

const AddRoomModal = ({
  hotel,
  title,
  modalTitle,
  modalDescription,
  room,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"outline"} type="button" className="max-w-[150px]">
          {title === "Add Room" ? (
            <Plus className="mr-2 h-4 w-4" />
          ) : (
            <PencilLine className="mr-2 h-4 w-4" />
          )}{" "}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-[90%]">
        <DialogHeader className="px-2">
          <DialogTitle>{modalTitle} a Room</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        <AddRoomForm
          hotel={hotel}
          room={room}
          handleDialogOpen={handleDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomModal;
