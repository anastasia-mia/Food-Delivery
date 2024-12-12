import {useState} from "react";

export const useDropDownVisibility = (isOpen: boolean = false ) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(isOpen);

    const toggleDropDownOpen = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }

    return {isDropDownOpen, toggleDropDownOpen}
}