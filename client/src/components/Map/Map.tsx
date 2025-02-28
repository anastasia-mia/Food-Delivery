import {useEffect, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {IMapProps} from "../../interfaces/geoInterfaces.ts";
import {fetchAddress} from "../../utils/fetchAddress.ts";
import {useDispatch} from "react-redux";
import {setDistance} from "../../redux/deliverySlice.ts";
import {addRestaurantAddress} from "../../redux/chosenRestaurantSlice.ts";
import {AppDispatch} from "../../redux/store.ts";
import useMap from "../../hooks/useMap.ts";
import {setUpMapRouting} from "./setUpMapRouting.ts";
import {getRandomCoordinates} from "../../utils/getRandomCoordinates.ts";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const Map = ({coords, setAddress, setCoords}: IMapProps) => {
        const [restaurantAddress, setRestaurantAddress] = useState<string>('')
        const dispatch: AppDispatch = useDispatch();
        const {mapRef, mapInstance} = useMap({coords, setCoords, setAddress});
        const customIcon = L.icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIcon2x,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        useEffect(() => {
            dispatch(addRestaurantAddress(restaurantAddress));
        }, [restaurantAddress]);

        useEffect(() => {
            if (!mapInstance.current) {
                console.error("Map instance is not initialized.");
                return;
            }

            if (setAddress) {
                fetchAddress(coords.lat, coords.lon, setAddress);
            }

            if (!setAddress) {
                mapInstance.current.setView([51.505, -0.09], 5);
                const randomCoords = getRandomCoordinates(coords.lat, coords.lon, 1, 4);
                L.marker([randomCoords.lat, randomCoords.lng], {icon: customIcon}).addTo(mapInstance.current)
                    .bindPopup('Restaurant')
                    .openPopup();

                if (randomCoords) {
                    fetchAddress(randomCoords.lat, randomCoords.lng, setRestaurantAddress);
                }

                L.marker([coords.lat, coords.lon], {icon: customIcon}).addTo(mapInstance.current)
                    .bindPopup('You')
                    .openPopup();

                dispatch(setDistance((L.latLng(coords.lat, coords.lon)
                    .distanceTo(L.latLng(randomCoords.lat, randomCoords.lng))) / 1000));

                setUpMapRouting({mapInstance: mapInstance.current, coords, randomCoords, dispatch});

            }
        }, [coords, mapInstance.current]);

        return <div ref={mapRef} id="map" style={{height: '400px', width: '100%', cursor: "not-allowed"}}></div>;
    }
;

export default Map;