import {FoodCard} from "../FoodCard/FoodCard.tsx";
import './MenuBody.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {IMenuItem} from "../../../interfaces/interfaces.ts";

interface MenuBodyProps {
    category: string;
}

export const MenuBody = ({category}: MenuBodyProps) => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const {id} = useParams();

    useEffect(() => {
        const categoryProp: string = category === 'All' ? '' : category.toLowerCase();
        axios.get(`http://localhost:3001/api/menu-items/${id}/${categoryProp}`)
            .then((res) => setMenuItems(res.data));
    }, [category]);

    return (
        <div className="menu_body">
            {menuItems.map((item: IMenuItem) => (
                <FoodCard menuItem={item} key={item.id}/>
            ))}
        </div>
    )
}