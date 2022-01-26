import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Slider, SliderProps } from '../../index';


export default {
    title: 'Components/Atoms/Slider',
    component: Slider,
    argTypes: {
        onChange: {
            action: {
                type: 'number',
            },
        },
    },
    args: {
        label: 'label',
        description: 'description',
    },
} as Meta;

export const Basic: Story<SliderProps> = (args) => <Slider {...args} />;

export const WithRail = Basic.bind({});
WithRail.args = {
    ...WithRail.args,
    hasRail: true,
};

export const WithDisabled = Basic.bind({});
WithDisabled.args = {
    ...WithDisabled.args,
    disabled: true,
};

export const WithTwoInputs = Basic.bind({});
WithTwoInputs.args = {
    ...WithTwoInputs.args,
    hasTwoKnobs: true,
    hasRail: true,
    hasPopup: true,
    min: 100,
    max: 300,
    step: 50,
    marks: [
        { key: 100, mark: '100' },
        { key: 150, mark: '150' },
        { key: 200, mark: '200' },
        { key: 250, mark: '250' },
        { key: 300, mark: '300' },
    ],
    padding: '20px',
};
