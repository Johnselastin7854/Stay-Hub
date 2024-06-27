"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";

type Props = {
  loading: boolean;
};

const HotelLocationSelect = ({ loading }: Props) => {
  const { control, watch } = useFormContext();
  const [isLoading, setIsLoading] = useState(loading);
  const [state, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const { getAllCountries, getCountryByState, getCititesByState } =
    useLocation();
  const countries = getAllCountries();

  useEffect(() => {
    const selectedCountry = watch("country");
    const countryStates = getCountryByState(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [watch("country")]);

  useEffect(() => {
    const selectedCountry = watch("country");
    const selectedStates = watch("state");
    const StatesCity = getCititesByState(selectedCountry, selectedStates);
    if (StatesCity) {
      setCities(StatesCity);
    }
  }, [watch("state"), watch("country")]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country *</FormLabel>
              <FormDescription>
                In Which country is your hotel located
              </FormDescription>
              <FormControl>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a Country"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countries?.map((country) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select State</FormLabel>
              <FormDescription>
                In Which region is your hotel located
              </FormDescription>
              <FormControl>
                <Select
                  disabled={isLoading || state.length < 1}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a State"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {state?.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select City (Optional)</FormLabel>
            <FormDescription>
              In Which city /town is your hotel located
            </FormDescription>
            <FormControl>
              <Select
                disabled={isLoading || cities.length < 1}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue
                    defaultValue={field.value}
                    placeholder="Select city"
                  />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default HotelLocationSelect;
