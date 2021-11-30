import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Datepicker, DatepickerProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Datepicker'),
    component: Datepicker,
    argTypes: { onChange: { action: `you picked: ` } },
    args: {
        disabled: false,
        label: 'label',
        placeholder: 'Placeholder',
        description: 'Description',
        price:25,
        priceStatus:0,
    },
} as Meta;

export const Basic: Story<DatepickerProps> = (args) => <Datepicker {...args} />;
