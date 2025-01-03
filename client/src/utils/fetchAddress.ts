import axiosInstance from "../../axiosConfig.ts";

export const fetchAddress = async (lat: number, lon: number, setAddress: (address: string) => void) => {
    try {
        if(lat === 0 && lon === 0) return;

        const response = await axiosInstance.get('/address', {
            params: { lat, lon }
        });

        if (response.data.formattedAddress) {
            setAddress(response.data.formattedAddress);
        }
    } catch (error) {
        console.error('Error fetching address:', error);
    }
};