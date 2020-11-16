import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { Timepicker, TimepickerProps } from '../../src';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('Timepicker'),
    component: Timepicker,
    argTypes: {
        timePickerValue: {
            control: {
                type: 'date',
            },
        },
    },
    args: {
        label: 'Timepicker',
        description: 'Click to pick a time',
        disabled: false,
        error: '',
    },
} as Meta;

export const Basic: Story<TimepickerProps> = (args) => {
    const [{ timePickerValue }, updateArgs] = useArgs();
    const setTimePickerValue = ({ target }) =>
        updateArgs({ timePickerValue: target.value });
    return (
        <Timepicker
            {...args}
            onChange={setTimePickerValue}
            value={timePickerValue}
        />
    );
};
