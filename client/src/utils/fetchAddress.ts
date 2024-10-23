import axios from "axios";

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