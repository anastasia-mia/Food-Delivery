import {Request, Response} from "express";
import {addPromoCode, getEndDate, getPromoCode} from "../queries/promoCodeQueries";

export const createNewPromoCode = async(req: Request, res: Response) => {
    try{
        const {code, discount, endDate} = req.body;

        if(!code || !discount || !endDate){
            return res.status(400).send("Missing fields. Provide code, discount and end date");
        }

        const promoCode = await getPromoCode(code);

        if(promoCode){
            return res.status(400).send("Promo code already exists");
        }

        const startDate: Date = new Date();

        await addPromoCode({code, discount, startDate, endDate});

        return res.status(200).send("Promo code created");
    }catch{
        return res.status(500).send('Error creating promo code!');
    }
}

export const getDiscount = async(req: Request, res: Response) => {
    try{
        const {code, total} = req.params;

        const promoCode = await getPromoCode(code);

        if(!promoCode){
            return res.status(400).send("Promo code doesn't exist!")
        }

        const promoCodeEndDate: Date = await getEndDate(code);
        const today: Date = new Date();

        if(today >= promoCodeEndDate){
            return res.status(400).send("Promo code is out of date!")
        }

        const discount: number = promoCode.discount;
        const newTotal: number = Number(total) - (Number(total) * discount) / 100;

        return res.status(200).json({discount, newTotal})
    }catch(error){
        return res.status(500).send('Error getting discount !');
    }
}