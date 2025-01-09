import {Header} from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import {Footer} from "../Footer/Footer.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {LocationPopUp} from "../LocationPopUp/LocationPopUp.tsx";
import {AuthModal} from "../AuthModal/AuthModal.tsx";
import {BurgerMenu} from "../Burgermenu/BurgerMenu.tsx";
import {Cart} from "../Cart/Cart.tsx";
import {setIsCartDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {Modal} from "../Modal/Modal.tsx";

export const Layout = () => {
    const {
        isLocationPopUpDisplayed,
        isRegisterPopUpDisplayed,
        isLoginPopUpDisplayed,
        isBurgerMenuDisplayed,
        isCartDisplayed
    } = useSelector((state: RootState) => state.popUpDisplaying);
    const {isDisplayedModal} = useSelector((state: RootState) => state.modal);
    const dispatch: AppDispatch = useDispatch();

    return (
        <>
            <Header/>
            <div className="content-wrap">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer/>
            {isLocationPopUpDisplayed && <LocationPopUp/>}
            {isLoginPopUpDisplayed && <AuthModal type={'login'}/>}
            {isRegisterPopUpDisplayed && <AuthModal type={'register'}/>}
            {isBurgerMenuDisplayed && <BurgerMenu/>}
            {isCartDisplayed &&
                <div className="popUp-background">
                    <div className="cart-wrapper">
                        <div className="cart-header">
                            <div className="cross"
                                 onClick={() => dispatch(setIsCartDisplayed(false))}>
                            </div>
                        </div>
                        <Cart/>
                    </div>
                </div>
            }
            {isDisplayedModal && <Modal />}
        </>
    )
}