import './OrderProgress.scss';
import Lottie from 'lottie-react';
import lottieShipment from '../../../assets/lottie-shipment.json';

interface OrderProgress{
    statusId: number,
    statusName: string
}

export const OrderProgress = ({statusId, statusName}: OrderProgress) => {

    return (
        <div className="progress">
            <Lottie animationData={lottieShipment} className="progress-gif"/>
            <div className="progress-bar">
                <div
                    className={`${statusId === 1 ? `progress-animated` : statusId > 1 ? `fulfilled` : `empty`}`}>
                    {statusId === 1 && statusName}
                </div>
                <div
                    className={`${statusId === 2 ? `progress-animated` : statusId > 2 ? `fulfilled` : `empty`}`}>
                    {statusId === 2 && statusName}
                </div>
                <div
                    className={`${statusId === 3 ? `progress-animated` : statusId > 3 ? `fulfilled` : `empty`}`}>
                    {statusId === 3 && statusName}
                </div>
            </div>
        </div>
    )
}

