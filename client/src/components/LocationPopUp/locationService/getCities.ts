import {CityOption} from "../../../interfaces/geoInterfaces.ts";
import axios from "axios";

export const getCities =
    (setterFunction: (suggestions: CityOption[]) => void, tapedValue?: string, countryCode?: string): void => {
        axios.get<CityOption[]>('http://localhost:3001/api/cities',
            {params: {tapedValue, countryCode}}
        )
            .then(res => setterFunction(res.data))
            .catch((err) => console.error('Error fetching countries:', err))
    }