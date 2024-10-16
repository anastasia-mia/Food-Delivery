import {useEffect, useRef} from "react";
import L from "leaflet";
import {fetchAddress} from "../components/LocationPopUp/locationService.ts";
import {IMapProps} from "../interfaces/geoInterfaces.ts";

const useMap = ({coords, setCoords, setAddress}: IMapProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if(mapRef.current && !mapInstance.current){
            mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance.current);
        }

        if(mapInstance.current) {
            mapInstance.current.setView([coords.lat, coords.lon], mapInstance.current.getZoom());
            if(markerRef.current){
                markerRef.current.setLatLng([coords.lat, coords.lon]);
            }else {
                markerRef.current = L.marker([coords.lat, coords.lon], {draggable: true}).addTo(mapInstance.current);

                markerRef.current.on('moveend', (event) => {
                    const newLatLng = event.target.getLatLng();
                    if (setCoords && setAddress) {
                        setCoords({lat: newLatLng.lat, lon: newLatLng.lng});
                        fetchAddress(newLatLng.lat, newLatLng.lng, setAddress);
                    }
                })
            }
        }

    }, [coords]);

    return {mapRef, mapInstance}
}

export default useMap;