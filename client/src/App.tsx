import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {RestaurantPage} from "./pages/RestaurantPage/RestaurantPage.tsx";

function App() {

    return (
        <>
            <Router>
                <Header/>
                <div className="content_wrap">
                    <Routes>
                        {/*<Route path="/" element={<Layout />}/>*/}
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
                    </Routes>
                </div>
                <Footer/>
            </Router>
        </>
    )
}

export default App
