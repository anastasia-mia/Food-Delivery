import {useEffect} from "react";

const useNoScroll = (isVisible: boolean) => {
    useEffect(() => {
        document.body.classList.add("no-scroll");

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isVisible]);
}

export default useNoScroll;