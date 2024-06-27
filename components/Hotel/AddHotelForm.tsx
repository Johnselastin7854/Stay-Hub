"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Eye, Loader2, Pencil, PencilLine, Trash } from "lucide-react";
import axios from "axios";

import { useRouter } from "next/navigation";
import HotelImageUpload from "./HotelImageUpload";
import HotelLocationSelect from "./HotelLocationSelect";
import HotelAlert from "./Alert";
import AddRoomModal from "../Room/AddRoomModal";
import { hotelAmenties } from "@/config/hotelAmertiesList";
import RoomCard from "../Room/RoomCard";
import { Separator } from "../ui/separator";
import HotelAmenities from "./HotelAmenties";

interface AddhotelForms {
  hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be atleast 3 characters long",
  }),
  description: z.string().min(10, {
    message: "description must be atleast 3 characters long",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: "locationDescription must be atleast 3 characters long",
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});

const AddHotelForm = ({ hotel }: AddhotelForms) => {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [isLoading, setIsLoading] = useState(false);
  const [isHotelDeleting, setIsHotelDeleting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: hotel || {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimmingPool: false,
      coffeeShop: false,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (hotel) {
      // Update the hotel
      axios
        .patch(`/api/hotel/${hotel.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            description: "🎉 Hotel updated successfully",
          });
          router.push(`/hotel/${res.data.id}`);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    } else {
      // create a new hotel
      axios
        .post("/api/hotel", values)
        .then((res) => {
          toast({
            variant: "success",
            description: "🎉 Hotel created successfully",
          });
          router.push(`/hotel/${res.data.id}`);
          setIsLoading(false);
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
  }

  const handleDeleteHotel = async (hotel: HotelWithRooms) => {
    setIsHotelDeleting(true);
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);
    try {
      const imageKey = getImageKey(hotel.image);
      await axios.post("/api/uploadthing/delete", { imageKey });
      await axios.delete(`/api/hotel/${hotel.id}`);
      setIsHotelDeleting(false);
      toast({
        variant: "success",
        description: "Hotel Deleted",
      });
      router.push("/hotel/new");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Hotel Deletion could not be completed",
      });
      setIsHotelDeleting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-lg font-semibold">
          {hotel ? "Update Your Hotel" : "Describe Your Hotel"}
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Title *</FormLabel>
                  <FormDescription>Provide Your Hotel Name</FormDescription>
                  <FormControl>
                    <Input placeholder="Beach Hotel" {...field} />
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
                  <FormLabel>Hotel Description *</FormLabel>
                  <FormDescription>
                    Provide a detailed description of your hotel
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Beach Hotel  with beautiful View"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <HotelAmenities
              amentiesList={hotelAmenties}
              title="Choose Amenities (Optional)"
              description="Choose Amenities that are available at your hotel"
            />
            <HotelImageUpload hotelImage={image} setHotelImage={setImage} />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <HotelLocationSelect loading={isLoading} />

            <FormField
              control={form.control}
              name="locationDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Description *</FormLabel>
                  <FormDescription>
                    Provide more information about the location of your hotel.
                    Tip, use landmarks like school,hospital,church and main
                    street
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Beach Hotel is located opposite to the St.Xavier Church"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {hotel && !hotel.rooms.length && <HotelAlert />}

            <div className="flex justify-between gap-2 flex-wrap">
              {hotel && (
                <Button
                  variant={"ghost"}
                  type="button"
                  className="max-w-[150px] "
                  disabled={isLoading || isHotelDeleting}
                  onClick={() => handleDeleteHotel(hotel)}
                >
                  {isHotelDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting
                    </>
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4 " />
                      Delete
                    </>
                  )}
                </Button>
              )}

              {hotel && (
                <Button
                  variant={"outline"}
                  type="button"
                  className="max-w-[150px]"
                  disabled={isLoading || isHotelDeleting}
                  onClick={() => router.push(`/hotel-details/${hotel.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
              )}

              {hotel && (
                <AddRoomModal
                  hotel={hotel}
                  title="Add Room"
                  modalTitle="Add"
                  modalDescription="Add a details about a room in your hotel"
                />
              )}

              {hotel ? (
                <Button className="max-w-[150px]" disabled={isLoading}>
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
                <Button className="max-w-[150px]" disabled={isLoading}>
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

            {hotel && !!hotel.rooms.length && (
              <div>
                <Separator className="bg-primary/10" />
                <h3 className="text-lg font-semibold my-4">Hotel Rooms</h3>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                  {hotel?.rooms.map((room) => (
                    <RoomCard key={room.id} hotel={hotel} room={room} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddHotelForm;
