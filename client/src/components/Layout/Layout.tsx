import {Header} from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import {Footer} from "../Footer/Footer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {LocationPopUp} from "../LocationPopUp/LocationPopUp.tsx";
import {Login} from "../Login/Login.tsx";

export const Layout = () => {
    const {isLocationPopUpDisplayed, isLoginPopUpDisplayed} = useSelector((state: RootState) => state.popUpDisplaying);

    return (
        <>
            <Header />
            <div className="content_wrap">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer/>
            {isLocationPopUpDisplayed && <LocationPopUp />}
            {isLoginPopUpDisplayed && <Login />}
        </>
    )
}