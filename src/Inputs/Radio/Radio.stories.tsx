import React from 'react';
import { Radio, RadioProps } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Radio'),
    component: Radio,
    args: {
        disabled: false,
        name: 'Demo',
    },
} as Meta;

export const Basic: Story<RadioProps> = (args) => <Radio {...args}></Radio>;

export const WithLabel = Basic.bind({});
WithLabel.args = {
    ...WithLabel.args,
    label: 'Labelled Radio Button',
};

export const WithColumn = Basic.bind({});
WithColumn.args = {
    ...WithColumn.args,
    label: 'Labelled Radio Button',
    column: true,
};

export const WithDisabled = Basic.bind({});
WithDisabled.args = {
    ...WithDisabled.args,
    label: 'Labelled Radio Button',
    disabled: true,
};

export const WithRadioStyle = Basic.bind({});
WithRadioStyle.args = {
    ...WithRadioStyle.args,
    label: 'Labelled Radio Button',
    radioStyle: () => 'border-color: blue',
};

export const WithActiveStyle = Basic.bind({});
WithActiveStyle.args = {
    ...WithActiveStyle.args,
    label: 'Labelled Radio Button',
    radioStyle: () => 'border-color: blue',
    activeStyle: () => 'background-color: blue',
};
