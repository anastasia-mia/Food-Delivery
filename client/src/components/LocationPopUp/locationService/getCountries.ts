import {CountryOption} from "../../../interfaces/geoInterfaces.ts";
import axiosInstance from "../../../../axiosConfig.ts";

export const getCountries = (setterFunction: (suggestions: CountryOption[]) => void): void => {
    axiosInstance.get<CountryOption[]>('/countries')
        .then((res) => setterFunction(res.data))
        .catch((err) => console.error('Error fetching countries:', err))
}
