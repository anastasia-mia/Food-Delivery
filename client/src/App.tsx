import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {RestaurantPage} from "./pages/RestaurantPage/RestaurantPage.tsx";
import {CheckoutPage} from "./pages/CheckoutPage/CheckoutPage.tsx";
import {Layout} from "./components/Layout/Layout.tsx";
import {checkSession} from "./redux/authSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store.ts";
import {OrderHistory} from "./pages/OrderHistory/OrderHistory.tsx";
import {AdminLayout} from "./admin/AdminLayout/AdminLayout.tsx";
import {AdminOrders} from "./admin/AdminOrders/AdminOrders.tsx";
import {AdminMessages} from "./admin/AdminMessages/AdminMessages.tsx";
import {AdminChat} from "./admin/AdminMessages/AdminChat/AdminChat.tsx";

function App() {
    const dispatch: AppDispatch = useDispatch();
    dispatch(checkSession())

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/restaurants/:restaurantName" element={<RestaurantPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                        <Route path="/order-history" element={<OrderHistory />}/>
                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="/admin/orders" replace />} />
                        <Route path="/admin/orders" element={<AdminOrders />}/>
                        <Route path="/admin/messages" element={<AdminMessages />}/>
                        <Route path="/admin/messages/:id" element={<AdminChat />}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;
