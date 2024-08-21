import {Header} from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Suspense, useState} from "react";
import {Footer} from "../Footer/Footer.tsx";
import {LocationPopUp} from "../LocationPopUp/LocationPopUp.tsx";

export const Layout = () => {
    const [isPopUpDisplayed, setIsPopUpDisplayed] = useState<boolean>(false);

    return (
        <>
            <Header setIsPopUpDisplayed={setIsPopUpDisplayed} />
            <div className="content_wrap">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer/>
            {isPopUpDisplayed && <LocationPopUp setIsPopUpDisplayed={setIsPopUpDisplayed}/>}
        </>
    )
}