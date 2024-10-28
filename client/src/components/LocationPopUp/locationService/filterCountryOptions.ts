import {CountryOption} from "../../../interfaces/geoInterfaces.ts";

export const filterCountryOptions = (typedValue: string,
                                     suggestions: CountryOption[],
                                     setFilteredCountries: (filteredOptions: CountryOption[]) => void): void => {
    const lowercasedInput = typedValue.toLowerCase();
    const filtered = suggestions.filter((country: CountryOption) =>
        country.name.toLowerCase().includes(lowercasedInput)
    );
    setFilteredCountries(filtered);
}