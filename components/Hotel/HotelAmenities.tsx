import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

const HotelAmenities = () => {
  const { control } = useFormContext();
  return (
    <div>
      <FormLabel>Choose Amenities (Optional)</FormLabel>
      <FormDescription>
        Choose Amenities that are available at your hotel
      </FormDescription>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <FormField
          control={control}
          name="gym"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Gym</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="spa"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Spa</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bar"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Bar</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="laundry"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Laundry</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="restaurant"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Restaurant</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="freeParking"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Free Parking</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bikeRental"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Bike Rental</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="freeWifi"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Free Wifi</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="movieNights"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Movie Nights</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="swimmingPool"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Swimming Pool</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="coffeeShop"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 rounded-md border-p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Coffee Shop</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default HotelAmenities;
