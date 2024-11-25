import {ICartItem} from "../../../interfaces/interfaces.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import './Order.scss';
import {useEffect, useMemo, useState} from "react";
import {ArrowDown} from "../../../components/Icon/ArrowDown.tsx";
import useWindowWidth from "../../../hooks/useWindowWidth.ts";
import {OrderItems} from "./OrderItems/OrderItems.tsx";

interface IOrder{
    setTotalPrice: (totalPrice: number) => void;
}

export const Order = ({setTotalPrice}: IOrder) => {
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const deliveryPrice: number = useSelector((state: RootState) => state.deliveryPrice.price);
    const {restaurantName} = useSelector((state: RootState) => state.chosenRestaurant)
    const windowWidth = useWindowWidth();
    const [isOrderItemsVisible, setIsOrderItemsVisible] = useState<boolean>(windowWidth > 1024);
    const serviceFee: number = 0.90;

    const totalCartPrice: number = useMemo(() => {
        return (menuItems.reduce((acc, item) =>
            acc + item.price * item.quantity, 0)) + serviceFee + deliveryPrice;
    }, [menuItems, deliveryPrice])

    useEffect(() => {
        setTotalPrice(Number(totalCartPrice.toFixed(2)));
    }, [totalCartPrice]);

    const toggleOrderItemsVisibility = () => {
        setIsOrderItemsVisible(!isOrderItemsVisible);
    }

    return(
        <div className="order">
            <div className="order_container">
                <div className="order_title" >
                    <p>Your order from <span>{restaurantName}</span></p>
                      {windowWidth <= 1024 &&
                          <div className="order_dropdown_icon" onClick={toggleOrderItemsVisibility}>
                              <span>{isOrderItemsVisible ? "hide order" : "see order"}</span>
                              <ArrowDown isOptionsOpen={isOrderItemsVisible} />
                          </div>
                      }
                </div>
                {isOrderItemsVisible && (
                    <OrderItems menuItems={menuItems}/>
                )}
                <div className="order_payment">
                    <div className="order_payment_fee">
                        <p>Sum:</p>
                        <p>{(totalCartPrice - serviceFee - deliveryPrice).toFixed(2)}€</p>
                    </div>
                    <div className="order_payment_fee">
                        <p>Service fee:</p>
                        <p>{serviceFee}€</p>
                    </div>
                    <div className="order_payment_fee">
                        <p>Delivery:</p>
                        <p>{deliveryPrice}€</p>
                    </div>
                    <div className="order_payment_total">
                        <p>Total:</p>
                        <p data-testid="order-total">{totalCartPrice.toFixed(2)}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}