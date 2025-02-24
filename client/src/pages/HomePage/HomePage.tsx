import "./HomePage.scss"
import {Banners} from "./Banners/Banners.tsx";
import {Restaurants} from "./Restaurants/Restaurants.tsx";
import useScrollToTop from "../../hooks/useScrollToTop.ts";
import {Achievement} from "./Achievement/Achievement.tsx";
import {useRef} from "react";

export const HomePage = () => {
    const targetNumbers = [17000, 40000, 100, 1890];
    const names = ['Customers', 'Orders', 'Restaurants', 'Food items'];
    const achievementRef = useRef(null);
    useScrollToTop();

    return (
        <div>
            <main className="wrapper">
                <div className="container">
                    <Banners/>
                    <Restaurants />
                    <section className="achievements" ref={achievementRef}>
                        {targetNumbers.map((item, index) => (
                            <div className="achievements-item" key={index}>
                                <Achievement targetNumber={item} name={names[index]} refBlock={achievementRef}/>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    )
}