import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '@Inputs';
import {
    ItemsRedemptionPoints,
    IItemsRedemptionPointsProps,
    IData,
} from './ItemsRedemptionPoints';


export default {
    title: 'Components/Items Redemption Points',
    component: ItemsRedemptionPoints,
    args: {
        titleText: 'Food',
        titleDescription:
            'Use the arrows to assign redemption points to each item.',
        cancelButtonText: 'Cancel',
        applyButtonText: 'Apply',
        batchUpdateButtonText: 'Batch Update',
        applyToAllItemsText: 'Apply to All Items',
        data: [
            {
                name: 'Hot Dog',
                redemptionPoints: 3,
            },
            {
                name: 'Pickle',
                redemptionPoints: 3,
            },
            {
                name: 'Chips',
                redemptionPoints: 0,
            },
        ],
    },
} as Meta;

export const Basic: Story<IItemsRedemptionPointsProps> = ({
    data,
    ...args
}) => {
    const [dataItems, setDataItems] = useState(data);
    const [isModalShown, setIsModalShown] = useState(false);

    /**
     * opens the modal
     */
    const showComponent = () => {
        setIsModalShown(true);
    };

    /**
     * closes the modal
     */
    const closeModal = () => {
        setIsModalShown(false);
    };

    /**
     * do business logic with the state of dataItems set by the user and closes the modal/component
     * @param newDataItems {IData[]} - the state of dataItems as modified by the user interaction
     */
    const applyChanges = (newDataItems: IData[]) => {
        setDataItems(newDataItems);
        closeModal();
    };

    return (
        <>
            <Button onClick={showComponent}>Show Component</Button>
            <ItemsRedemptionPoints
                data={dataItems}
                {...args}
                modalProps={{ state: [isModalShown, setIsModalShown] }}
                onClickApplyButton={applyChanges}
                onClickCancelButton={closeModal}
            />
        </>
    );
};
