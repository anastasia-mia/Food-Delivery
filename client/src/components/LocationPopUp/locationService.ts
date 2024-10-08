import axios from "axios";
import {CityOption, CountryOption, ICoords} from "../../interfaces/geoInterfaces.ts";

export const getCountries = (setterFunction: (suggestions: CountryOption[]) => void): void => {
    axios.get<CountryOption[]>('http://localhost:3001/api/countries')
        .then((res) => setterFunction(res.data))
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
        axios.get<CityOption[]>('http://localhost:3001/api/cities',
            {params: {tapedValue, countryCode}}
        )
            .then(res => setterFunction(res.data))
            .catch((err) => console.error('Error fetching countries:', err))
    }

export const fetchCityCoordinates = async (country: string, city: string) => {
    try {
        const response = await axios.get('http://localhost:3001/api/coordinates', {
            params: { country, city }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        return null;
    }
}

export const fetchAddress = async (lat: number, lon: number, setAddress: (address: string) => void) => {
    try {
        if(lat === 0 && lon === 0) return;
        const response = await axios.get('http://localhost:3001/api/address', {
            params: { lat, lon }
        });
        if (response.data.formattedAddress) {
            setAddress(response.data.formattedAddress);
        }
    } catch (error) {
        console.error('Error fetching address:', error);
    }
};

export const fetchCurrentAddress = async(): Promise<ICoords> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ lat: latitude, lon: longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
}