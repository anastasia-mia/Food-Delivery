import {ICoords} from "../../../interfaces/geoInterfaces.ts";

export const fetchCurrentAddress = async(): Promise<ICoords> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ lat: latitude, lon: longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
}