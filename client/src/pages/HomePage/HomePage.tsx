import "./HomePage.scss"
import {Banners} from "./Banners/Banners.tsx";
import {Restaurants} from "./Restaurants/Restaurants.tsx";

export const HomePage = () => {

    return (
        <div>
            <main className="wrapper">
                <div className="container">
                    <Banners/>
                    <Restaurants />
                    <section className="achievements">
                        <div className="achievements_item">
                            <p className="item_number">17000+</p>
                            <p className="item_name">Customers</p>
                        </div>
                        <div className="achievements_item">
                            <p className="item_number">40000+</p>
                            <p className="item_name">Orders</p>
                        </div>
                        <div className="achievements_item">
                            <p className="item_number">100+</p>
                            <p className="item_name">Restaurants</p>
                        </div>
                        <div className="achievements_item">
                            <p className="item_number">1890+</p>
                            <p className="item_name">Food items</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}