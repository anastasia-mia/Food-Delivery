import axiosInstance from "../../../../axiosConfig.ts";

export const fetchCityCoordinates = async (country: string, city: string) => {
    try {
        const response = await axiosInstance.get('/coordinates', {
            params: { country, city }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        return null;
    }
}