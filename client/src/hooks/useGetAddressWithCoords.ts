import { useEffect } from 'react';
import { fetchAddress } from '../utils/fetchAddress.ts';
import {ICoords} from "../interfaces/geoInterfaces.ts";

const useGetAddressWithCoords = (setAddress: (address: string) => void) => {

    useEffect(() => {
        const handleStorageChange = () => {
            const storedCoords = localStorage.getItem('coords');
            if (storedCoords) {
                const coords: ICoords = JSON.parse(storedCoords);
                if (coords.lat && coords.lon) {
                    fetchAddress(coords.lat, coords.lon, setAddress);
                }
            }else {
                setAddress("");
            }
        };

        window.addEventListener('storageChange', handleStorageChange);
        handleStorageChange();

        return () => window.removeEventListener('storageChange', handleStorageChange);
    }, [setAddress]);
};

export default useGetAddressWithCoords;