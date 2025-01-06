import {WelcomeBanner} from "./WelcomeBanner.tsx";
import {PromoBanner} from "./PromoBanner.tsx";
import {useEffect, useRef, useState} from "react";
import './Banners.scss';

export const Banners = () => {
    const banners = [<WelcomeBanner />, <PromoBanner />];
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const cloneBanners = [...banners, ...banners];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === cloneBanners.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [cloneBanners.length]);

    useEffect(() => {
        if (trackRef.current) {
            if (currentIndex === cloneBanners.length) {
                setTimeout(() => {
                    if (trackRef.current) {
                        trackRef.current.style.transition = 'none';
                        trackRef.current.style.transform = `translateX(0%)`;
                        setCurrentIndex(0);
                    }
                }, 500);

            } else {
                trackRef.current.style.transition = 'transform 0.5s ease';
                trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        }
    }, [currentIndex]);

    return (
        <section className="banners">
            <div className="banners-track" ref={trackRef}>
                {cloneBanners.map((banner, index) => (
                    <div key={index} className="banner-container">
                        {banner}
                    </div>
                ))}
            </div>
        </section>
    )
}