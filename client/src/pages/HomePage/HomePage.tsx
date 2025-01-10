import "./HomePage.scss"
import {Banners} from "./Banners/Banners.tsx";
import {Restaurants} from "./Restaurants/Restaurants.tsx";
import useScrollToTop from "../../hooks/useScrollToTop.ts";

export const HomePage = () => {
    useScrollToTop();

    return (
        <div>
            <main className="wrapper">
                <div className="container">
                    <Banners/>
                    <Restaurants />
                    <section className="achievements">
                        <div className="achievements-item">
                            <p className="item-number">17000+</p>
                            <p className="item-name">Customers</p>
                        </div>
                        <div className="achievements-item">
                            <p className="item-number">40000+</p>
                            <p className="item-name">Orders</p>
                        </div>
                        <div className="achievements-item">
                            <p className="item-number">100+</p>
                            <p className="item-name">Restaurants</p>
                        </div>
                        <div className="achievements-item">
                            <p className="item-number">1890+</p>
                            <p className="item-name">Food items</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}