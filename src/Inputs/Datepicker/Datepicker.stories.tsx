import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Datepicker, DatepickerProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Datepicker'),
    component: Datepicker,
    argTypes: { onChange: { action: `you picked: ` } },
    args:{
        disabled: false,
        label: 'label',
        placeholder: 'Placeholder',
        description: 'Description',
        selectedDays:

            [
                {
                    date: new Date(2022,0,19),
                    price: "$25",
                    priceStatus:1
                },
                {
                    date: new Date(2022,0,18),
                    price: "$45",
                    priceStatus:0
                },
                {
                    date: new Date(2022,0,17),
                    price: "$70",
                    priceStatus: 2
                }

            ],
    }
} as Meta;

export const Basic: Story<DatepickerProps> = (args) => <Datepicker {...args} />;
