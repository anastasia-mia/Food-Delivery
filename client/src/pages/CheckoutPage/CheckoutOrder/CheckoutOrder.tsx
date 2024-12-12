import {ICartItem} from "../../../interfaces/interfaces.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import './CheckoutOrder.scss';
import {useEffect, useMemo, useState} from "react";
import {ArrowDown} from "../../../components/Icon/ArrowDown.tsx";
import useWindowWidth from "../../../hooks/useWindowWidth.ts";
import {OrderItems} from "../../../components/OrderItems/OrderItems.tsx";
import {PromoCode} from "./PromoCode/PromoCode.tsx";
import {useDropDownVisibility} from "../../../hooks/useDropDownVisibility.ts";

interface IOrder {
    setTotalPrice: (totalPrice: number) => void;
}

export const CheckoutOrder = ({setTotalPrice}: IOrder) => {
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const deliveryPrice: number = useSelector((state: RootState) => state.deliveryPrice.price);
    const {restaurantName} = useSelector((state: RootState) => state.chosenRestaurant);
    const windowWidth = useWindowWidth();
    const {isDropDownOpen, toggleDropDownOpen} = useDropDownVisibility(windowWidth > 1024);
    const [totalWithPromoCode, setTotalWithPromoCode] = useState<number | null>(null)
    const serviceFee: number = 0.90;

    const totalCartPrice: number = useMemo(() => {
        return (menuItems.reduce((acc, item) =>
            acc + item.price * item.quantity, 0)) + serviceFee + deliveryPrice;
    }, [menuItems, deliveryPrice])

    useEffect(() => {
        setTotalPrice(totalWithPromoCode ? totalWithPromoCode : Number(totalCartPrice.toFixed(2)));
    }, [totalCartPrice, totalWithPromoCode]);

    return (
        <div className="checkout-order">
            <div className="checkout-order_container">
                <div className="checkout-order_title">
                    <p>Your order from <span>{restaurantName}</span></p>
                    {windowWidth <= 1024 &&
                        <div className="checkout-order_dropdown_icon" onClick={toggleDropDownOpen}>
                            <span>{isDropDownOpen ? "hide order" : "see order"}</span>
                            <ArrowDown isOptionsOpen={isDropDownOpen}/>
                        </div>
                    }
                </div>
                {isDropDownOpen && (
                    <OrderItems menuItems={menuItems}/>
                )}
                <div className="checkout-order_payment">
                    <div className="checkout-order_payment_fee">
                        <p>Sum:</p>
                        <p>{(totalCartPrice - serviceFee - deliveryPrice).toFixed(2)}€</p>
                    </div>
                    <div className="checkout-order_payment_fee">
                        <p>Service fee:</p>
                        <p>{serviceFee}€</p>
                    </div>
                    <div className="checkout-order_payment_fee">
                        <p>Delivery:</p>
                        <p>{deliveryPrice}€</p>
                    </div>
                    <div className="checkout-order_payment_total_container">
                        <PromoCode total={Number(totalCartPrice.toFixed(2))}
                                   setTotalWithPromoCode={setTotalWithPromoCode}
                        />
                        <div className="checkout-order_payment_total">
                            <p>Total:</p>
                            <p data-testid="checkout-order-total">
                                {totalWithPromoCode ? totalWithPromoCode : totalCartPrice.toFixed(2)}€
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}