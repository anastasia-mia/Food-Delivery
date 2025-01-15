import {useEffect, useRef} from "react";

export const useScrollContentToBottom = <T extends HTMLElement>() => {
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        if(elementRef.current){
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }, []);

    return elementRef;
}