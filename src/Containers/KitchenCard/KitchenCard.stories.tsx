import React from 'react';
import { Meta, Story } from '@storybook/react';
import { KitchenCard, KitchenCardProps } from '../../index';
import { Button } from '../../Inputs/Button/Button';


enum StatusColorFilter {
    PREPARING = 'orange',
    PLACED = 'green',
    COMPLETE = 'green',
    CANCELLED = 'red',
    PREPARED = 'green',
}

enum StatusTypes {
    PREPARING = 'PREPARING',
    PLACED = 'PLACED',
    COMPLETE = 'COMPLETE',
    CANCELLED = 'CANCELLED',
    PREPARED = 'PREPARED',
}

const sampleOrder = {
    _id: '5f15ff0d1689a01c4b9cc72f',
    status: 'CANCELLED',
    items: [
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
            modifiers: [
                {
                    name: 'Modifier Name',
                    choices: [
                        {
                            name: 'Choice One',
                            identifier: 'choice1',
                            avalible: true,
                            price: 100,
                            choice_type: 'NO',
                        },
                        {
                            name: 'Choice Two',
                            identifier: 'choice2',
                            avalible: true,
                            price: 100,
                            choice_type: 'ADD',
                        },
                        {
                            name: 'Choice Three',
                            identifier: 'choice3',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                        {
                            name: 'Choice Four',
                            identifier: 'choice4',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                    ],
                    description: 'This is a description',
                    is_topping: true,
                    required: true,
                },
            ],
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
            modifiers: [
                {
                    name: 'Modifier Name',
                    choices: [
                        {
                            name: 'Choice One',
                            identifier: 'choice1',
                            avalible: true,
                            price: 100,
                            choice_type: 'NO',
                        },
                        {
                            name: 'Choice Two',
                            identifier: 'choice2',
                            avalible: true,
                            price: 100,
                            choice_type: 'ADD',
                        },
                        {
                            name: 'Choice Three',
                            identifier: 'choice3',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                        {
                            name: 'Choice Four',
                            identifier: 'choice4',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                    ],
                    description: 'This is a description',
                    is_topping: true,
                    required: true,
                },
            ],
        },
        {
            name: 'Cool Sandwich',
            _id: '5e8a23d1b0bd74723d927706',
            modifiers: [
                {
                    name: 'Modifier Name',
                    choices: [
                        {
                            name: 'Choice One',
                            identifier: 'choice1',
                            avalible: true,
                            price: 100,
                            choice_type: 'NO',
                        },
                        {
                            name: 'Choice Two is Long Choice Name',
                            identifier: 'choice2',
                            avalible: true,
                            price: 100,
                            choice_type: 'ADD',
                        },
                        {
                            name: 'Choice Three',
                            identifier: 'choice3',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                        {
                            name: 'Choice Four',
                            identifier: 'choice4',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                    ],
                    description: 'This is a description',
                    is_topping: true,
                    required: true,
                },
            ],
        },
        {
            name: 'This is a very long Sandwich Name',
            _id: '5e8a23d1b0bd74723d927706',
            modifiers: [
                {
                    name: 'Modifier Name',
                    choices: [
                        {
                            name: 'Choice One',
                            identifier: 'choice1',
                            avalible: true,
                            price: 100,
                            choice_type: 'NO',
                        },
                        {
                            name: 'Choice Two',
                            identifier: 'choice2',
                            avalible: true,
                            price: 100,
                            choice_type: 'ADD',
                        },
                        {
                            name: 'Choice Three',
                            identifier: 'choice3',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                        {
                            name: 'Choice Four',
                            identifier: 'choice4',
                            avalible: true,
                            price: 100,
                            choice_type: 'DEFAULT',
                        },
                    ],
                    description: 'This is a description',
                    is_topping: true,
                    required: true,
                },
            ],
        },
    ],
    customer: {
        name: 'Ralph Maamari',
    },
    order_type: 'EAT_IN',
};

const StatusModifierComponent = (
    <>
        <Button loading={false} margin="0 6px 5px 0">
            Hello
        </Button>
        <Button loading={false} margin="0 6px 0 0">
            Hello
        </Button>
    </>
);

export default {
    title: 'Components/KitchenCard',
    component: KitchenCard,
    argTypes: {
        status: {
            control: {
                type: 'select',
                options: StatusTypes,
            },
        },
        isFullName: {
            type: 'radio',
            options: [true, false],
        },
    },
    args: {
        cardWidth: 230,
        cardMargin: 10,
        cardHeight: 400,
        items: sampleOrder.items,
        isFullName: true,
        TimeComponent: '10:00',
        orderType: sampleOrder.order_type,
        customer: sampleOrder.customer,
        status: StatusTypes[sampleOrder.status],
        StatusModifierComponent,
        _id: sampleOrder._id,
    },
} as Meta;

export const Basic: Story<KitchenCardProps> = (args) => (
    <KitchenCard {...args} statusColor={StatusColorFilter[args.status]} />
);
