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

export const getCities =
    (setterFunction: (suggestions: CityOption[]) => void, tapedValue?: string, countryCode?: string): void => {
        const username = import.meta.env.VITE_GEONAMES_USERNAME;
        axios.get<CityResponse>(
            `http://api.geonames.org/searchJSON?q=${tapedValue}&country=${countryCode}&maxRows=30&username=${username}`)
            .then((res) => {
                const cityOptions: CityOption[] = res.data.geonames
                    .filter((city) => tapedValue ? city.name.toLowerCase().includes(tapedValue.toLowerCase()) : true)
                    .map((city) => ({
                        name: city.name
                    }));
                return (cityOptions);
            }).then((cityOptions) => setterFunction(cityOptions));
    }

export const fetchCityCoordinates = async (country: string, city: string):
    Promise<{ lat: number; lon: number } | null> => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: `${city}, ${country}`,
                format: 'json',
                limit: 1,
            },
        });

        const data = response.data[0];
        if (data) {
            const lat = parseFloat(data.lat);
            const lon = parseFloat(data.lon);
            return {lat, lon};
        } else {
            return null;
        }

    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        return null
    }
}

export const fetchAddress = async (lat: number, lon: number, setAddress: (address: string) => void) => {
    try {
        const apiKey = import.meta.env.VITE_OPENCAGEDATA_KEY;
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: `${lat}+${lon}`,
                key: apiKey
            }
        });
        const result = response.data.results[0];
        if (result) {
            const formattedAddress = result.formatted;
            setAddress(formattedAddress);
        } else {
            setAddress('No address found');
        }
    } catch (error) {
        console.error('Error fetching address:', error);
    }
};