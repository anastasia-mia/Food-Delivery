import './BurgerMenu.scss';
import {useEffect, useState} from "react";
import axiosInstance from "../../../axiosConfig.ts";
import {RestaurantType} from "./RestaurantType/RestaurantType.tsx";
import {IRestaurantType} from "../../interfaces/restaurantInterfaces.ts";
import {setIsBurgerMenuDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "../../redux/store.ts";
import {AuthToggle} from "./AuthAction/AuthToggle.tsx";
import useNoScroll from "../../hooks/useNoScroll.ts";

export const BurgerMenu = () => {
    const [types, setTypes] = useState<IRestaurantType[]>([]);
    const {user, isLoggedIn} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    useNoScroll(true);

    useEffect(() => {
        axiosInstance.get('/categories').then((res) => setTypes(res.data))
    }, []);

    const closePopup = () => {
        dispatch(setIsBurgerMenuDisplayed(false));
    }

    return (
        <div className="popUp-background">
            <div className="burgerMenu">
                <div className="burgerMenu-header">
                    <div className="cross"
                         onClick={closePopup}>
                    </div>
                </div>
                <div className="burgerMenu-body">
                    {isLoggedIn && user && <p className="burgerMenu-greeting">Hello, {user}!</p>}
                    <div className="burgerMenu-types">
                        {types.map((type) => (
                            <div key={type.id}>
                                <RestaurantType type={type}/>
                            </div>
                        ))}
                    </div>
                    <div className="burgerMenu-tabs">
                        {isLoggedIn &&
                            <Link to="/order-history">
                                <div onClick={closePopup}>
                                    Orders
                                </div>
                            </Link>
                        }
                    </div>
                    <AuthToggle/>
                </div>
            </div>
        </div>
    )
}