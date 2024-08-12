import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {RestaurantPage} from "./pages/RestaurantPage/RestaurantPage.tsx";
import {CheckoutPage} from "./pages/CheckoutPage/CheckoutPage.tsx";
import {Layout} from "./components/Layout/Layout.tsx";

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;
