import './CustomerInfo.scss';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ClientDetails} from "../../../interfaces/orderInterfaces.ts";
import {customerInfoSchema} from "../../../validations/customerInfoSchema.ts";

interface ICustomerInfoProps {
    onSubmitOrder: (data: ClientDetails) => void;
}

export const CustomerInfo = ({onSubmitOrder}: ICustomerInfoProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(customerInfoSchema)
    });

    return (
        <form className="customer-info"
              data-testid="customer-info-form"
              onSubmit={handleSubmit(onSubmitOrder)}
        >
            <div className="customer-info-group">
                <div className="customer-info-column">
                    <label className="customer-info-label">Name*
                        <input type="text"
                               placeholder="Name"
                               className="customer-info-input"
                               {...register("name")}/>
                        <p className="customer-info-error">{errors.name?.message}</p>
                    </label>
                    <label className="customer-info-label">Surname*
                        <input type="text"
                               placeholder="Surname"
                               className="customer-info-input"
                               {...register("surName")}/>
                        <p className="customer-info-error">{errors.surName?.message}</p>
                    </label>
                </div>
                <div className="customer-info-column">
                    <label className="customer-info-label">Phone number*
                        <input type="text"
                               placeholder="Phone number"
                               className="customer-info-input"
                               {...register("phoneNumber")}/>
                        <p className="customer-info-error">{errors.phoneNumber?.message}</p>
                    </label>
                    <label className="customer-info-label">Email*
                        <input type="text"
                               placeholder="Email"
                               className="customer-info-input"
                               {...register("email")}/>
                        <p className="customer-info-error">{errors.email?.message}</p>
                    </label>
                </div>
            </div>
            <label className="customer-info-label"> Comment
                <textarea placeholder="Write the comment if necessary"
                          className="customer-info-input"
                          {...register("comment")}
                />
            </label>
            <button type='submit' className="customer-info-btn">CONFIRM ORDER</button>
        </form>
    )
}