import React from 'react';
import { KitchenCard, KitchenProps } from '../../src';
import {Button} from '../../src/Inputs/Button'
import {createStoryTitle} from "../Constants";
import { Meta, Story } from '@storybook/react';

const sampleOrder = {
    _id: '5f15ff0d1689a01c4b9cc72f',
    status: 'preparing',
    items: [
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
    ],
    customer: {
        name: 'Ralph Maamari',
    },
    order_type: 'EAT_IN',
};
const sampleOrderMany = {
    _id: '5f15ff0d1689a01c4b9cc72f',
    status: 'preparing',
    items: [
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
        },
    ],
    customer: {
        name: 'Ralph Maamari',
    },
    order_type: 'EAT_IN',
};

const StatusModifierComponent = <><Button loading={false} margin="0 6px 5px 0">Hello</Button><Button loading={false} margin="0 6px 0 0">Hello</Button></>


export default {
    title: createStoryTitle('Kitchen Card'),
    component: KitchenCard,
    args: { 
        cardWidth: 230,
        cardMargin: 10, 
        cardHeight: 400,
        modifiers: [
            ['Add Lettuce', 'Mayo'],
            ['No Ketchup', 'Add Bacon', 'Add Olives'],
            [],
            ['Add Lettuce'],
            [],
            ['No Ketchup'],
            [],
        ],
        isFullName: false,
        TimeComponent: '10:00',
        StatusModifierComponent: StatusModifierComponent,
        orderType: sampleOrder.order_type,
        items: {...sampleOrder}
    },
} as Meta;

export const Basic: Story<KitchenProps> = (args) => (
          <KitchenCard {...args}/>
);
