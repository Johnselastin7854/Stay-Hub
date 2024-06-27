import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

type Props = {
  amentiesList: string[];
  title: string;
  description: string;
};

const HotelAmenities = ({ amentiesList, description, title }: Props) => {
  const { control } = useFormContext();

  function insertSpaces(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  return (
    <div>
      <FormLabel>{title}</FormLabel>
      <FormDescription>{description}</FormDescription>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {amentiesList?.map((amenties) => (
          <FormField
            key={amenties}
            control={control}
            name={amenties}
            render={({ field }) => (
              <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="capitalize">
                  {insertSpaces(amenties)}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
