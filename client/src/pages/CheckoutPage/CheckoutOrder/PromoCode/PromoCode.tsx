import "./PromoCode.scss";
import React, {useState} from "react";
import axiosInstance from "../../../../../axiosConfig.ts";

interface promoCodeProps {
    total: number,
    setTotalWithPromoCode: (totalWithPromoCode: number | null) => void;
}

export const PromoCode = ({total, setTotalWithPromoCode}: promoCodeProps) => {
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
    const [discount, setDiscount] = useState<number>(0);
    const [newTotal, setNewTotal] = useState<number>(0)
    const [promoCode, setPromoCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const toggleInputVisibility = () => {
        setIsInputVisible(!isInputVisible);
    }

    const applyPromoCode = () => {
        axiosInstance.get(`/getPromoCode/${promoCode}/${total}`)
            .then((res) => {
                setTotalWithPromoCode(Number((res.data.newTotal).toFixed(2)));
                setNewTotal(Number((res.data.newTotal).toFixed(2)));
                setDiscount(res.data.discount);
            })
            .then(() => setIsInputVisible(false))
            .catch((err) => setError(err.response.data))
    }

    const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(error) setError('');
        setPromoCode(e.target.value);
    };

    return (
        <div className="promocode">
            {isInputVisible ?
                <div className="promocode-input-container">
                    <input type="text"
                           className="promocode-input"
                           placeholder="Promocode"
                           onChange={handlePromoCodeChange}
                    />
                    <button onClick={applyPromoCode}>
                        Apply
                    </button>
                    <p className="promocode-input-error">{error}</p>
                </div> :
                    discount > 0 ?
                        <div className="promocode-discount-container">
                        <p className="promocode-text">Promo code -{discount}%</p>
                        <p className="promocode-text">-{(total - newTotal).toFixed(2)}</p>
                    </div> :
                    <p className="promocode-text"
                       onClick={toggleInputVisibility}
                    >
                        Add promo code
                    </p>
            }
        </div>
    )
}