"use client";
import Image from "next/image";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2, XCircle } from "lucide-react";
import { UploadButton } from "../Uploadthing";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import axios from "axios";

type Props = {
  hotelImage: string | undefined;
  setHotelImage: (value: string | undefined) => void;
  fullWidth?: boolean;
};

const HotelImageUpload = ({ hotelImage, setHotelImage, fullWidth }: Props) => {
  const { control } = useFormContext();
  const { toast } = useToast();
  const [image, setImage] = useState<string | undefined>(hotelImage);
  const [imageIsDeleted, setImageIsDeleted] = useState(false);

  const handleImageDelete = (image: string) => {
    setImageIsDeleted(true);

    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          setHotelImage("");
          toast({
            variant: "success",
            description: "Image removed",
          });
        }
      })
      .catch((err: any) => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      })
      .finally(() => {
        setImageIsDeleted(false);
      });
  };

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-3 flex-grow">
          <FormLabel>Upload an Image *</FormLabel>
          <FormDescription>
            Choose an image that will show-case your hotel nicely
          </FormDescription>
          <FormControl>
            {image ? (
              <>
                <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                  <Image
                    fill
                    src={image}
                    alt="hotel_image"
                    className="object-contain"
                    sizes="100vw"
                  />
                  <Button
                    onClick={() => handleImageDelete(image)}
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute right-[-12px] top-0"
                  >
                    {imageIsDeleted ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <XCircle />
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex flex-col items-center ${
                    fullWidth ? "w-full" : "max-w-[400px]"
                  }  p-12 border-2 border-dashed border-primary/50 rounded mt-4`}
                >
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImage(res[0].url);
                      setHotelImage(res[0].url);
                      toast({
                        variant: "success",
                        description: "🎉 Upload Completed",
                      });
                    }}
                    onUploadError={(error: Error) => {
                      toast({
                        variant: "destructive",
                        description: `ERROR! ${error.message}`,
                      });
                    }}
                  />
                </div>
              </>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default HotelImageUpload;
