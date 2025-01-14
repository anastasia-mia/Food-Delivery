import {FoodCard} from "../FoodCard/FoodCard.tsx";
import './MenuBody.scss';
import {useEffect, useState} from "react";
import axiosInstance from '../../../../axiosConfig.ts';
import {IMenuItem} from "../../../interfaces/cartInterfaces.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";

interface MenuBodyProps {
    category: string;
}

export const MenuBody = ({category}: MenuBodyProps) => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const {id} = useSelector((state: RootState) => state.currentRestaurant);

    useEffect(() => {
        if(id){
            const categoryProp: string = category === 'All' ? '' : category.toLowerCase();
            axiosInstance.get(`/menu-items/${id}/${categoryProp}`)
                .then((res) => setMenuItems(res.data));
        }
    }, [category, id]);

    return (
        <div className="menu-body">
            {menuItems.map((item: IMenuItem) => (
                <FoodCard menuItem={item} key={item.id}/>
            ))}
        </div>
    )
}