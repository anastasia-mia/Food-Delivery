import './BurgerMenu.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {RestaurantType} from "./RestaurantType/RestaurantType.tsx";
import {IRestaurantType} from "../../interfaces/interfaces.ts";
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
        axios.get('http://localhost:3001/api/categories')
            .then((res) => setTypes(res.data))
    }, []);

    const closePopup = () => {
        dispatch(setIsBurgerMenuDisplayed(false));
    }

    return (
        <div className="popUp-background">
            <div className="burgerMenu">
                <div className="burgerMenu_header">
                    <div className="cross"
                         onClick={closePopup}>
                    </div>
                </div>
                <div className="burgerMenu_body">
                    {isLoggedIn && user && <p className="burgerMenu_greeting">Hello, {user}!</p>}
                    <div className="burgerMenu_types">
                        {types.map((type, index) => (
                            <div key={index}>
                                <RestaurantType type={type}/>
                            </div>
                        ))}
                    </div>
                    <div className="burgerMenu_tabs">
                        {isLoggedIn &&
                            <Link to="/orders">
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