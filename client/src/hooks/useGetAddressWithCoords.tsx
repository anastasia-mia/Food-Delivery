import { useEffect } from 'react';
import { fetchAddress } from '../components/LocationPopUp/selectFunctions.ts';
import {ICoords} from "../components/LocationPopUp/interfaces.ts";

const useGetAddressWithCoords = (setAddress: (address: string) => void) => {

    useEffect(() => {
        const handleStorageChange = () => {
            const storedCoords = localStorage.getItem('coords');
            if (storedCoords) {
                const coords: ICoords = JSON.parse(storedCoords);
                fetchAddress(coords.lat, coords.lon, setAddress);
            }
        };

        window.addEventListener('storageChange', handleStorageChange);
        handleStorageChange();

        return () => window.removeEventListener('storageChange', handleStorageChange);
    }, [setAddress]);
};

export default useGetAddressWithCoords;