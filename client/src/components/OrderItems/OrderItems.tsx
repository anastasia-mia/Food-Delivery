import './OrderItems.scss';
import {ICartItem} from "../../interfaces/cartInterfaces.ts";
import {IOrderMenuItem} from "../../interfaces/orderInterfaces.ts";
import {ArrowDown} from "../Icons/ArrowDown.tsx";
import {useLocation} from "react-router-dom";
import {useDropDownVisibility} from "../../hooks/useDropDownVisibility.ts";
import {useMemo, useState} from "react";

export type IOrderItem = ICartItem | IOrderMenuItem;

export const OrderItems = ({menuItems}: {menuItems: IOrderItem[]}) => {
    const location = useLocation();
    const {isDropDownOpen, toggleDropDownOpen} = useDropDownVisibility();
    const [showAll, setShowAll] = useState<boolean>(false);

    const displayedItems: IOrderItem[] = useMemo(() => (
        location.pathname === '/order-history' && !showAll ? menuItems.slice(0,4) : menuItems
    ), [location.pathname, showAll])

    const handleArrowClick = () => {
        toggleDropDownOpen();
        setShowAll(!showAll)
    }

    return (
        <div className="checkout-order-items">
            <div className="checkout-order-headers">
                <p>Dish</p>
                <p>Quantity</p>
                <p>Price</p>
            </div>
            {displayedItems.map((item: IOrderItem) => (
                <div key={'menuItemId' in item ? item.menuItemId : item.id} className="checkout-order-item" data-testid="order-item">
                    <p>{'name' in item ? item.name : item.menuItemName}</p>
                    <p>{item.quantity}х</p>
                    <p>{item.price}€</p>
                </div>
            ))}
            {location.pathname === '/order-history' && menuItems.length > 4 &&
                <div onClick={handleArrowClick} className="checkout-order-arrow">
                    <ArrowDown isOptionsOpen={isDropDownOpen}/>
                </div>
            }
        </div>
    )
}