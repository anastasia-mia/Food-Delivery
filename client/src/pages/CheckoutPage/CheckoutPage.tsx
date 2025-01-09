import './CheckoutPage.scss';
import {CheckoutOrder} from "./CheckoutOrder/CheckoutOrder.tsx";
import Map from "../../components/Map/Map.tsx";
import useStoredCoords from "../../hooks/useStoredCoords.ts";
import {useEffect, useState} from "react";
import {setIsLocationPopUpDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {ICoords} from "../../interfaces/geoInterfaces.ts";
import {CustomerInfo} from "./CustomerInfo/CustomerInfo.tsx";
import {Delivery} from "./Delivery/Delivery.tsx";
import {ICartItem} from "../../interfaces/cartInterfaces.ts";
import {ClientDetails} from "../../interfaces/orderInterfaces.ts";
import {RootState} from "../../redux/store.ts";
import axiosInstance from "../../../axiosConfig.ts";
import useGetAddressWithCoords from "../../hooks/useGetAddressWithCoords.ts";
import {removeAllItems} from "../../redux/cartSlice.ts";
import {resetRestaurant} from "../../redux/chosenRestaurantSlice.ts";
import {setIsDisplayedModal, setModalInformation} from "../../redux/modalSlice.ts";
import {useNavigate} from "react-router-dom";

export const CheckoutPage = () => {
    const storedCoords = useStoredCoords();
    const [coords, setCoords] = useState<ICoords>({lat: 0, lon: 0});
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [address, setAddress] = useState<string>('');
    const {menuItems}: {menuItems: ICartItem[]} = useSelector((state: RootState) => state.cart);
    const {restaurant_id}: {restaurant_id: number} = useSelector((state: RootState) => state.chosenRestaurant);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useGetAddressWithCoords(setAddress)

    useEffect(() => {
        const handleStorageChange = () => {
            const storedCoords = localStorage.getItem('coords');
            if (storedCoords) {
                const coords: ICoords = JSON.parse(storedCoords);
                setCoords(coords)
            }
        };
        window.addEventListener('storageChange', handleStorageChange);
        handleStorageChange();

        return () => window.removeEventListener('storageChange', handleStorageChange);
    }, []);

    useEffect(() => {
        if(storedCoords.lat === 0 && storedCoords.lon === 0) {
            dispatch(setIsLocationPopUpDisplayed(true))
        }else{
            dispatch(setIsLocationPopUpDisplayed(false))
        }
    }, [storedCoords]);

    const onSubmitOrder = (data: ClientDetails) => {
        axiosInstance.post('/createOrder', {
            customer: {...data, address},
            orderItems: menuItems,
            total: totalPrice,
            restaurantId: restaurant_id
        })
            .then(() => {
                dispatch(removeAllItems());
                dispatch(resetRestaurant());
                navigate('/');
                dispatch(setIsDisplayedModal(true));
                dispatch(setModalInformation(
                    {
                        text: "You have successfully made an order!",
                        buttonText: "See my orders",
                        link: "/order-history"
                    }));
            })
    }

    return(
        <section className="checkout">
            <div className="checkout-container container">
                <div className="checkout-info">
                    <div className="checkout-map">
                        <Map coords={coords}/>
                    </div>
                    <div className="checkout-personal-info">
                        <p className="checkout-personal-info-title">Customer data</p>
                        <CustomerInfo onSubmitOrder={onSubmitOrder}/>
                    </div>
                </div>
                <div className="checkout-order-receipt">
                    <CheckoutOrder setTotalPrice={setTotalPrice} />
                    <Delivery />
                </div>
            </div>
        </section>
    )
}