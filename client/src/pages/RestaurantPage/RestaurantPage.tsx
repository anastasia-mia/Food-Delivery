import "./RestaurantPage.scss"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Cart} from "../../components/Cart/Cart.tsx";
import {Categories} from "./Categories/Categories.tsx";
import {MenuBody} from "./MenuBody/MenuBody.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {fetchRestaurant, fetchRestaurantId} from "../../redux/currentRestaurantSlice.ts";
import {setIsBurgerMenuDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import useWindowWidth from "../../hooks/useWindowWidth.ts";
import {Card} from "./Card/Card.tsx";
import useScrollToTop from "../../hooks/useScrollToTop.ts";
import {setRestaurant} from "../../redux/chosenRestaurantSlice.ts";
import {ICartItem} from "../../interfaces/cartInterfaces.ts";

export const RestaurantPage = () => {
    const {restaurantName} = useParams();
    const [category, setCategory] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const {id, loading, restaurant} = useSelector((state: RootState) => state.currentRestaurant);
    const {highlightedCart} = useSelector((state: RootState) => state.cart);
    const windowWidth = useWindowWidth();
    useScrollToTop();

    useEffect(() => {
        dispatch(fetchRestaurantId({name: restaurantName as string}))
        dispatch(setIsBurgerMenuDisplayed(false));
    }, [restaurantName]);

    useEffect(() => {
        dispatch(fetchRestaurant())
    }, [id]);

    useEffect(() => {
        if (restaurant && restaurant.name && menuItems.length === 0) {
            dispatch(setRestaurant({restaurant_id: id as number, restaurantName: restaurant.name}))
        }
    }, [menuItems, restaurant]);

    return(
        <section className="restaurant">
            <div className="container restaurant-container">
                <Card restaurant={restaurant}/>
                {loading ? (
                    <p className="restaurant-loading">Loading restaurant items ...</p>
                ) : (
                    <>
                        <Categories setCategory={setCategory}/>
                        <MenuBody category={category} />
                    </>
                )}
                {windowWidth > 1280 && (
                    <div className="restaurant-cart">
                        <div className={`restaurant-cart-wrapper ${highlightedCart ? 'restaurant-cart-highlighted' : ''}`}>
                            <Cart />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}