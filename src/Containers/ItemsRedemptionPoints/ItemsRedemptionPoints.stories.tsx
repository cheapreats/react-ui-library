import React,{useState} from 'react';
import { Meta, Story } from '@storybook/react';
import {Button} from '@Inputs'
import { ItemsRedemptionPoints, IItemsRedemptionPointsProps,IData } from './ItemsRedemptionPoints';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Items Redemption Points'),
    component: ItemsRedemptionPoints,
    args:{
        titleText:'Food',
        titleDescription:'Use the arrows to assign redemption points to each item.',
        cancelButtonText:'Cancel',
        applyButtonText:'Apply',
        batchUpdateButtonText:'Batch Update',
        applyToAllItemsText:'Apply to All Items',
        data:[
            {
                name:'Hot Dog',
                redemptionPoints:3
            },
            {
                name:'Pickle',
                redemptionPoints:3
            },
            {
                name:'Chips',
                redemptionPoints:0
            },
        ]
    },
} as Meta;

export const Basic: Story<IItemsRedemptionPointsProps> = (args) => {
    const [isModalShown, setIsModalShown]=useState(false)

    /**
     * opens the modal
     */
    const showComponent=()=>{
        setIsModalShown(true)
    }

    /**
     * closes the modal
     */
    const closeModal=()=>{
        setIsModalShown(false)
    }

    /**
     * do business logic with the state of dataItems set by the user
     * @param dataItems {IData[]} - the state of dataItems as modified by the user interaction
     */
    const applyChanges=(dataItems:IData[])=>{
        // do something with dataItems
        closeModal()
    }

    return (
        <>
            <Button onClick={showComponent}>Show Component</Button>
            <ItemsRedemptionPoints {...args} modalProps={{state:[isModalShown,setIsModalShown]}} onClickApplyButton={applyChanges} onClickCancelButton={closeModal} />
        </>
    )
}