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

export const RestaurantPage = () => {
    const {restaurantName} = useParams();
    const [category, setCategory] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const {id, loading, restaurant} = useSelector((state: RootState) => state.currentRestaurant);
    const {highlightedCart} = useSelector((state: RootState) => state.cart);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        dispatch(fetchRestaurantId({name: restaurantName as string}))
        dispatch(setIsBurgerMenuDisplayed(false));
    }, [restaurantName]);

    useEffect(() => {
        dispatch(fetchRestaurant())
    }, [id]);

    return(
        <section className="restaurant">
            <div className="container restaurant_container">
                <Card restaurant={restaurant}/>
                {loading ? (
                    <p className="restaurant_loading">Loading restaurant items ...</p>
                ) : (
                    <>
                        <Categories setCategory={setCategory}/>
                        <MenuBody category={category}/>
                    </>
                )}
                {windowWidth > 1280 && (
                    <div className="restaurant_cart">
                        <div className={`restaurant_cart_wrapper ${highlightedCart ? 'restaurant_cart_highlighted' : ''}`}>
                            <Cart />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}