import {Header} from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import {Footer} from "../Footer/Footer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {LocationPopUp} from "../LocationPopUp/LocationPopUp.tsx";

export const Layout = () => {
    const isPopupOpen = useSelector((state: RootState) => state.locationPopUp.isPopupOpen);

    return (
        <>
            <Header />
            <div className="content_wrap">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer/>
            {isPopupOpen && <LocationPopUp />}
        </>
    )
}