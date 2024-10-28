import {CountryOption} from "../../../interfaces/geoInterfaces.ts";
import axios from "axios";

export const getCountries = (setterFunction: (suggestions: CountryOption[]) => void): void => {
    axios.get<CountryOption[]>('http://localhost:3001/api/countries')
        .then((res) => setterFunction(res.data))
        .catch((err) => console.error('Error fetching countries:', err))
}
