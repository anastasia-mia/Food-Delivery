import './AdminLayout.scss';
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {AdminHeader} from "../AdminHeader/AdminHeader.tsx";
import {AdminNavBar} from "../AdminNavBar/AdminNavBar.tsx";

export const AdminLayout = () => {

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