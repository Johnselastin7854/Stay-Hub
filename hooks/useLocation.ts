import { Country, State, City } from "country-state-city";

const useLocation = () => {
  const getCountryByCode = (countryCode: string) => {
    return Country.getAllCountries().find(
      (country) => country.isoCode === countryCode
    );
  };

  const getStateByCode = (countryCode: string, stateCode: string) => {
    const state = State.getAllStates().find(
      (state) =>
        state.countryCode === countryCode && state.isoCode === stateCode
    );

    if (!state) return null;

    return state;
  };

  const getCountryByState = (countryCode: string) => {
    return State.getAllStates().filter(
      (state) => state.countryCode === countryCode
    );
  };

  const getCititesByState = (countyCode: string, stateCode?: string) => {
    return City.getAllCities().filter(
      (city) => city.countryCode === countyCode && city.stateCode === stateCode
    );
  };

  return {
    getAllCountries: Country.getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryByState,
    getCititesByState,
  };
};

export default useLocation;
