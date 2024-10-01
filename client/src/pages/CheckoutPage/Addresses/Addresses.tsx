import {useState} from "react";
import useGetAddressWithCoords from "../../../hooks/useGetAddressWithCoords.tsx";
import './Addresses.scss';

export const Addresses = () => {
    const [addressClient, setAddressClient] = useState<string>('');

    useGetAddressWithCoords(setAddressClient);

    return(
        <div className="addresses">
            <p className="addresses_name">
                <span>To</span> {addressClient}
            </p>
        </div>
    )
}