import {useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MapComponent = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);

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

                        const randomCoords = getRandomCoordinates(latitude, longitude, 1, 4);
                        L.marker([randomCoords.lat, randomCoords.lng]).addTo(mapInstance.current)
                            .bindPopup('Restaurant')
                            .openPopup();

                        if (mapInstance.current) {
                            L.Routing.control({
                                waypoints: [
                                    L.latLng(latitude, longitude),
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

                            const element = document.querySelector('.leaflet-routing-container');
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
                },
            );
        }
    }, []);

    return <div ref={mapRef} id="map" style={{height: '400px', width: '100%', cursor: "not-allowed"}}></div>;
};

export default MapComponent;