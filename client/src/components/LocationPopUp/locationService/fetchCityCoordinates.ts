import axios from "axios";

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