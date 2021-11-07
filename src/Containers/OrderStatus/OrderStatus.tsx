import React from 'react';
import { Status, StatusColors } from '../Status/Status';

export enum OrderStatusIdentifier {
    PLACED = 'PLACED',
    PREPARING = 'PREPARING',
    PREPARED = 'PREPARED',
    COMPLETE = 'COMPLETE',
    CANCELLED = 'CANCELLED',
}

export interface IOrderStatusProps {
    /* Status of order (Placed, Preparing, Cancelled etc...) */
    orderStatus: OrderStatusIdentifier;
}

export const OrderStatus = ({
    orderStatus,
    ...props
}: IOrderStatusProps): React.ReactElement => {
    /* Returns color based on order status */
    const handleOrderStatus = (): StatusColors => {
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
