import React, { useState } from 'react';
import { Datepicker, DatepickerProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Datepicker'),
    component: Datepicker,
    argTypes: { onChange: { action: `you picked: ` } },
    args: {
        disabled: false,
        label: 'label',
        placeholder: 'Placeholder',
        description: 'Description',
    },
} as Meta;

export const Basic: Story<DatepickerProps> = (args) => {
    return <Datepicker {...args}></Datepicker>;
};
