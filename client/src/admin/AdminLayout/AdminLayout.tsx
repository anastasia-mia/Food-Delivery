import './AdminLayout.scss';
import {Suspense, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {AdminHeader} from "../AdminHeader/AdminHeader.tsx";
import {AdminNavBar} from "../AdminNavBar/AdminNavBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchStatuses} from "../../redux/statusesSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";
import useWindowWidth from "../../hooks/useWindowWidth.ts";

export const AdminLayout = () => {
    const dispatch: AppDispatch = useDispatch();
    const {isAdminBurgerMenuDisplayed} = useSelector((state: RootState) => state.popUpDisplaying);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        dispatch(fetchStatuses());
    }, []);

    return(
        <div className="admin-layout-wrapper">
            <AdminHeader />
            <main className="admin-layout-main">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </main>
            {windowWidth > 768 || isAdminBurgerMenuDisplayed ? (
                <div className={isAdminBurgerMenuDisplayed ? "popUp-background" : ""}>
                    <AdminNavBar />
                </div>
            ) : null}
        </div>

    )
}