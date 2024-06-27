"use client";
import { Room } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { HotelWithRooms } from "../Hotel/AddHotelForm";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import HotelImageUpload from "../Hotel/HotelImageUpload";
import {
  roomCustomizeListLeft,
  roomCustomizeListRight,
} from "@/config/room-customize-list";
import { Button } from "../ui/button";
import { Loader2, Pencil, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Checkbox } from "../ui/checkbox";

interface AddRoomForm {
  hotel?: HotelWithRooms;
  room?: Room;
  handleDialogOpen: () => void;
}

const AddRoomForm = ({ hotel, room, handleDialogOpen }: AddRoomForm) => {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>(room?.image);
  const [isLoading, setIsLoading] = useState(false);
  const [isRoomDeleting, setIsRoomDeleting] = useState(false);
  const { toast } = useToast();

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

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (hotel && room) {
      // Update the room
      axios
        .patch(`/api/room/${room.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            description: "🎉 Room updated successfully",
          });
          router.refresh();
          setIsLoading(false);
          handleDialogOpen();
        })
        .catch((err) => {
          console.error(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
          handleDialogOpen();
        });
    } else {
      if (!hotel) return;
      // create a new room
      axios
        .post("/api/room", { ...values, hotelId: hotel.id })
        .then((res) => {
          toast({
            variant: "success",
            description: "🎉 Room created successfully",
          });
          router.refresh();
          setIsLoading(false);
          form.reset();
        })
        .catch((err) => {
          console.error(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Title *</FormLabel>
                <FormDescription>Provide a room name</FormDescription>
                <FormControl>
                  <Input placeholder="Double Room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Description *</FormLabel>
                <FormDescription>
                  Is there anything special about this room?
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Double Room have 2 king size bed with siting area..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Choose Room Amenities (Optional)</FormLabel>
            <FormDescription>
              What makes this room a good choices?
            </FormDescription>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <FormField
                control={form.control}
                name={"roomService"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">Room Service</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"TV"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">TV</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"balcony"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">balcony</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"freeWifi"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">free Wifi</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"cityView"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">city View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"oceanView"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">ocean View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"forestView"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">forest View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"mountainView"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">mountain View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"airCondition"}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">air Condition</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <HotelImageUpload
            hotelImage={image}
            setHotelImage={setImage}
            fullWidth={true}
          />

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1 flex-col flex gap-6">
              {roomCustomizeListLeft?.map((customize) => (
                <FormField
                  key={customize.title}
                  control={form.control}
                  name={customize.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customize.title}</FormLabel>
                      <FormDescription>{customize.description}</FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          min={customize.min}
                          max={customize.max}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex-1 flex-col flex gap-6">
              {roomCustomizeListRight.map((customize) => (
                <FormField
                  key={customize.title}
                  control={form.control}
                  name={customize.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customize.title}</FormLabel>
                      <FormDescription>{customize.description}</FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          min={customize.min}
                          max={customize.max}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 pb-2">
            {room ? (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="max-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4 " />
                    Update
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="max-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4 " />
                    Create
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
