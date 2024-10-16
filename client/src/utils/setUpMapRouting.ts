import L from 'leaflet';
import {AppDispatch} from "../redux/store";
import {setTime} from "../redux/deliverySlice.ts";
import {ICoords} from "../interfaces/geoInterfaces.ts";

interface ISetUpMapRoutingProps{
    mapInstance: L.Map | null;
    coords: ICoords;
    randomCoords: {lat: number, lng: number};
    dispatch: AppDispatch;
}

export const setUpMapRouting = ({mapInstance, coords, randomCoords, dispatch} : ISetUpMapRoutingProps) => {
    if (mapInstance) {
        const routingControl = L.Routing.control({
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
        }).addTo(mapInstance);

        routingControl.on('routesfound', function (e) {
            const summary = e.routes[0].summary;
            const durationMinutes = summary.totalTime / 60;
            dispatch(setTime(durationMinutes));
        });

        const element = document.querySelector('.leaflet-right');
        if (element) {
            (element as HTMLElement).style.display = 'none';
        }

        const draggableMarkers = document.querySelectorAll('.leaflet-marker-draggable');
        draggableMarkers.forEach((marker) => {
            (marker as HTMLElement).style.display = 'none';
        })
        mapInstance.off('click');
    }
};
