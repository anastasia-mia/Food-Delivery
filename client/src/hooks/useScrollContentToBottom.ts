import {useEffect, useRef} from "react";
import {IMessage} from "../interfaces/chatInterfaces.ts";

export const useScrollContentToBottom = <T extends HTMLElement>(messages: IMessage[]) => {
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        if(elementRef.current){
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }, [messages]);

    return elementRef;
}