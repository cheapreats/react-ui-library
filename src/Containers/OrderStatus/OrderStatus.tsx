import React from 'react';
import { Status, StatusColors } from '../Status/Status';

export enum OrderStatusIdentifier {
    PLACED = 'PLACED',
    PREPARING = 'PREPARING',
    PREPARED = 'PREPARED',
    COMPLETE = 'COMPLETE',
    CANCELLED = 'CANCELLED',
}

interface IOrderStatusProps {
    /* Status of order (Placed, Preparing, Cancelled etc...) */
    orderStatus: string;
}

export const OrderStatus = ({
    orderStatus,
    ...props
}: IOrderStatusProps): React.ReactElement => {
    /* Returns color based on order status */
    const handleOrderStatus = () => {
        switch (orderStatus) {
            case OrderStatusIdentifier.PREPARED:
                return StatusColors.green;
            case OrderStatusIdentifier.COMPLETE:
                return StatusColors.green;
            case OrderStatusIdentifier.PREPARING:
                return StatusColors.orange;
            case OrderStatusIdentifier.PLACED:
                return StatusColors.red;
            case OrderStatusIdentifier.CANCELLED:
                return StatusColors.red;
            default:
                return StatusColors.red;
        }
    };

    return (
        <Status large statusColor={handleOrderStatus()} {...props}>
            {orderStatus}
        </Status>
    );
};

export default OrderStatus;
