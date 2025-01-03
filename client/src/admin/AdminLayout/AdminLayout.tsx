import './AdminLayout.scss';
import {Suspense, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {AdminHeader} from "../AdminHeader/AdminHeader.tsx";
import {AdminNavBar} from "../AdminNavBar/AdminNavBar.tsx";
import {useDispatch} from "react-redux";
import {fetchStatuses} from "../../redux/statusesSlice.ts";
import {AppDispatch} from "../../redux/store.ts";

export const AdminLayout = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStatuses());
    }, []);

    return(
        <div className="admin-layout-wrapper">
            <AdminHeader />
            <AdminNavBar />
            <main className="admin-layout-main">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </main>
        </div>

    )
}