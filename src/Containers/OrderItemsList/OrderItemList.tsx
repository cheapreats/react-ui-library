import React from 'react';
import styled from 'styled-components';
import { MenuItem, IMenuItemProps } from '../MenuItem/MenuItem';

export interface IOrderItems extends React.HTMLAttributes<HTMLDivElement> {
    // list of items in an order
    items: Array<IMenuItemProps>;
}

export const OrderItemList = ({
    items,
    ...props
}: IOrderItems): React.ReactElement => (
    <div {...props}>
        {items.map(({ name, price, modifiers }: IMenuItemProps) => (
            <SlotContainer>
                <MenuItem name={name} price={price} modifiers={modifiers} />
            </SlotContainer>
        ))}
    </div>
);

const SlotContainer = styled.div`
    margin: 5px 0px;
`;

export default OrderItemList;
