import {useLocation} from "react-router-dom";


export const useIsRestaurantPage = () => {
    const location = useLocation();

    return location.pathname.includes('restaurants/');
}