import {useEffect, useState} from "react";
import {ICoords} from "../components/LocationPopUp/interfaces.ts";

const useStoredCoords = () => {
    const [coords, setCoords] = useState<ICoords>({lat: 0, lon: 0});

    useEffect(() => {
        const storedCoords = localStorage.getItem('coords');
        if (storedCoords) {
            const parsedCoords: ICoords = JSON.parse(storedCoords);
            setCoords(parsedCoords);
        }
    }, []);

    return coords;
};

export default useStoredCoords;