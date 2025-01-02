import {toggleHighlightCart} from "../../redux/cartSlice.ts";
import {setIsCartDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useIsRestaurantPage} from "../../hooks/useIsRestaurantPage.ts";
import useWindowWidth from "../../hooks/useWindowWidth.ts";
import {useMemo} from "react";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {ICartItem} from "../../interfaces/cartInterfaces.ts";
import useNoScroll from "../../hooks/useNoScroll.ts";
import {Icon} from "../Icon/Icon.tsx";

export const NavBarCart = () => {
    const menuItems: ICartItem[] = useSelector((state: RootState) => state.cart.menuItems);
    const {isCartDisplayed} = useSelector((state: RootState) => state.popUpDisplaying);
    const dispatch: AppDispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isRestaurantPage = useIsRestaurantPage();
    useNoScroll(isCartDisplayed);

    const openCart = () => {
        if(isRestaurantPage && windowWidth >= 1280){
            dispatch(toggleHighlightCart(true));
            setTimeout(() => {
                dispatch(toggleHighlightCart(false));
            }, 2000);
        }else{
            dispatch(setIsCartDisplayed(true));
        }
    }

    const totalQuantity = useMemo(() =>
            menuItems.reduce((total, item) => total + item.quantity, 0),
        [menuItems]
    );

    return (
        <div className="navbar_cart" onClick={openCart}>
            <Icon id={"cart"}
                  width={"26"}
                  height={"26"}
                  stroke={"#473C33"}
                  testId={"navbar-cart"}
            />
            {menuItems.length !== 0 && <span data-testid="navbar-cart-quantity">{totalQuantity}</span>}
        </div>
    )
}