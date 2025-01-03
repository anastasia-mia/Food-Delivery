import './Categories.scss';
import {useEffect, useState} from "react";
import axiosInstance from "../../../../axiosConfig.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";

interface CategoriesProps{
    setCategory:(category:string) => void;
}

export const Categories = ({setCategory}: CategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>([]);
    const {id} = useSelector((state: RootState) => state.currentRestaurant);

    useEffect(() => {
        if(id){
            axiosInstance.get(`/menu-items/categories`, {params: {restaurantId: id}})
                .then((res) => setCategories(res.data));
        }
    }, [id]);

    const chooseCategory = (item: string): void => {
        setSelectedCategory(item);
        setCategory(item);
    }

    return (
        <div className="category_wrapper">
            <div className="menu_category category">
                <p>Categories</p>
                <div className="category_body">
                    <ul className="category_list">
                        <li className={`category_list_item ${selectedCategory === 'All' ? 'chosen_category' : ''}`}
                            onClick={() => chooseCategory('All')}
                        >
                            <span>All</span>
                        </li>
                        {categories.map((item: string, index: number) => (
                            <li key={index}
                                className={`category_list_item ${selectedCategory === item ? 'chosen_category' : ''}`}
                                onClick={() => chooseCategory(item)}>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}