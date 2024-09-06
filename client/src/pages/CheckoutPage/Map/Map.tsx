import {useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {ICoords} from "../../../components/LocationPopUp/interfaces.ts";
import {fetchAddress} from "../../../components/LocationPopUp/selectFunctions.ts";
import {useDispatch} from "react-redux";
import {setDistance} from "../../../redux/deliveryPriceSlice.ts";

interface IMapProps {
    coords: ICoords;
    setAddress?: (address: string) => void;
    setCoords?: (coords: ICoords) => void;
}

const MapComponent = ({coords, setAddress, setCoords}: IMapProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance.current);
        }

        if (mapInstance.current) {
            mapInstance.current.setView([coords.lat, coords.lon], mapInstance.current.getZoom());
            if (markerRef.current) {
                markerRef.current.setLatLng([coords.lat, coords.lon]);
            } else {
                markerRef.current = L.marker([coords.lat, coords.lon], {draggable: true})
                    .addTo(mapInstance.current)

                markerRef.current.on('moveend', (event) => {
                    const newLatLng = event.target.getLatLng();
                    if(setCoords && setAddress){
                        setCoords({lat: newLatLng.lat, lon: newLatLng.lng});
                        fetchAddress(newLatLng.lat, newLatLng.lng, setAddress);
                    }

                });
            }

            if(setAddress){
                fetchAddress(coords.lat, coords.lon, setAddress);
            }

            if(!setAddress){
                mapInstance.current.setView([51.505, -0.09], 5);
                const randomCoords = getRandomCoordinates(coords.lat, coords.lon, 1, 4);
                L.marker([randomCoords.lat, randomCoords.lng]).addTo(mapInstance.current)
                    .bindPopup('Restaurant')
                    .openPopup();

                L.marker([coords.lat, coords.lon]).addTo(mapInstance.current)
                    .bindPopup('You')
                    .openPopup();

                dispatch(setDistance((L.latLng(coords.lat, coords.lon).distanceTo(L.latLng(randomCoords.lat, randomCoords.lng))) / 1000));

                if (mapInstance.current) {
                    L.Routing.control({
                        waypoints: [
                            L.latLng(coords.lat, coords.lon),
                            L.latLng(randomCoords.lat, randomCoords.lng)
                        ],
                        routeWhileDragging: true,
                        showAlternatives: false,
                        lineOptions: {
                            styles: [{color: 'darkgreen', weight: 5}],
                            extendToWaypoints: false,
                            addWaypoints: false,
                            missingRouteTolerance: 0
                        },
                    }).addTo(mapInstance.current);

                    const element = document.querySelector('.leaflet-right');
                    if (element) {
                        (element as HTMLElement).style.display = 'none';
                    }

                    const draggableMarkers = document.querySelectorAll('.leaflet-marker-draggable');
                    draggableMarkers.forEach((marker) => {
                        (marker as HTMLElement).style.display = 'none';
                    })
                    mapInstance.current.off('click');
                }
            }
        } else {
            console.error("Map instance is not initialized.");
        }
    }, [coords, mapInstance.current]);



    const getRandomCoordinates = (centerLat: number, centerLng: number, minRadius: number, maxRadius: number) => {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const randomAngle = Math.random() * 2 * Math.PI;

        const offsetLat = radius * Math.cos(randomAngle) / 111.32;
        const offsetLng = radius * Math.sin(randomAngle) / (111.32 * Math.cos(centerLat * Math.PI / 180));

        return {
            lat: centerLat + offsetLat,
            lng: centerLng + offsetLng,
        };
    };

    return <div ref={mapRef} id="map" style={{height: '400px', width: '100%', cursor: "not-allowed"}}></div>;
};

export default MapComponent;