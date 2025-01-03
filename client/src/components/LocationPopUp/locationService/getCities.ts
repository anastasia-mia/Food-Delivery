import {CityOption} from "../../../interfaces/geoInterfaces.ts";
import axiosInstance from "../../../../axiosConfig.ts";

export const getCities =
    (setterFunction: (suggestions: CityOption[]) => void, tapedValue?: string, countryCode?: string): void => {
        axiosInstance.get<CityOption[]>('/cities',
            {params: {tapedValue, countryCode}}
        )
            .then(res => setterFunction(res.data))
            .catch((err) => console.error('Error fetching countries:', err))
    }