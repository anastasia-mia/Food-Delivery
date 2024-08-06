import {useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MapComponent = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapInstance.current) return;

        if (mapRef.current) {
            mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance.current);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    if (mapInstance.current) {
                        mapInstance.current.setView([latitude, longitude], 13);

                        L.marker([latitude, longitude]).addTo(mapInstance.current)
                            .bindPopup('Your Location')
                            .openPopup();
                    }
                },
            );
        }
        }, []);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;