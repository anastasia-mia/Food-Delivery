import axios from "axios";
import {CityOption, CityResponse, Country, CountryOption} from "./interfaces.ts";

export const getCountries = (setterFunction: (suggestions: CountryOption[]) => void): void => {
    axios.get<Country[]>('https://restcountries.com/v3.1/all').then((res) => {
        const countryOptions: CountryOption[] = res.data.map(country => ({
            code: country.cca2,
            name: country.name.common
        }));
        return countryOptions;
    }).then((countryOptions) => setterFunction(countryOptions))
        .catch((err) => console.error('Error fetching countries:', err))
}

export const filterCountryOptions = (typedValue: string,
                                     suggestions: CountryOption[],
                                     setFilteredCountries: (filteredOptions: CountryOption[]) => void): void => {
    const lowercasedInput = typedValue.toLowerCase();
    const filtered = suggestions.filter((country: CountryOption) =>
        country.name.toLowerCase().includes(lowercasedInput)
    );
    setFilteredCountries(filtered);
}

export const getCities = (setterFunction: (suggestions: CityOption[]) => void, tapedValue?: string, countryCode?: string): void => {
    axios.get<CityResponse>(`http://api.geonames.org/searchJSON?q=${tapedValue}&country=${countryCode}&maxRows=30&username=''`)
        .then((res) => {
            const cityOptions: CityOption[] = res.data.geonames
                .filter((city) => tapedValue ? city.name.toLowerCase().includes(tapedValue.toLowerCase()) : true)
                .map((city) => ({
                name: city.name
            }));
            return(cityOptions);
    }).then((cityOptions) => setterFunction(cityOptions));
}