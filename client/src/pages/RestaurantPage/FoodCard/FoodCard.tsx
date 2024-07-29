import './FoodCard.scss';


export const FoodCard= () => {

    return(
        <div className="food_card">
            <div className="food_card_container">
                <div className="food_card_top">
                    <div className="food_card_image"></div>
                    <div className="food_card_details">
                        <p className="food_card_name">AAAA</p>
                        <p className="food_card_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis d</p>
                    </div>
                </div>
                <div className="food_card_bottom">
                    <span className="food_card_price">128€</span>
                    <div className="food_card_buy"><span>+</span></div>
                </div>
            </div>
        </div>
    )
}