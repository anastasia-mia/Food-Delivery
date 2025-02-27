import {useEffect} from "react";

const useNoScroll = (isVisible: boolean) => {
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isVisible]);
}

export default useNoScroll;