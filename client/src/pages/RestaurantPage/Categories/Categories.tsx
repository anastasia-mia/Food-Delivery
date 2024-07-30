import './Categories.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

interface CategoriesProps{
    setCategory:(category:string) => void;
}

export const Categories = ({setCategory}: CategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>([]);
    const {id} = useParams<string>();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/menu-items/categories`, {params: {restaurantId: id}})
            .then((res) => setCategories(res.data));
    }, []);

    const chooseCategory = (item: string): void => {
        setSelectedCategory(item);
        setCategory(item);
    }

    return (
        <div className="menu_category category">
            <p>Categories</p>
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
    )
}