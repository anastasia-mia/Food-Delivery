import "./Achievement.scss";
import {MutableRefObject, useEffect, useState} from "react";

export const Achievement = ({targetNumber, name, refBlock}: {targetNumber: number, name: string, refBlock: MutableRefObject<null>}) => {
    const [number, setNumber] = useState(0);

    const animateNumberGrowing = (start: number, end: number, duration: number) => {
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const currentValue = Math.min(start + (end - start) * (progress / duration), end);
            setNumber(Math.floor(currentValue));
            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                setNumber(end);
            }
        };
        requestAnimationFrame(step);
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    animateNumberGrowing(0, targetNumber, 2000);
                    observer.unobserve(entry.target);
                }
            })
        }, {threshold: 0.5});

        if(refBlock.current){
            observer.observe(refBlock.current);
        }

        return () => {
            if (refBlock.current) {
                observer.unobserve(refBlock.current);
            }
        };
    }, [targetNumber]);

    return(
        <>
            <p className="achievement-number">{number}+</p>
            <p className="achievement-name">{name}</p>
        </>
    )
}