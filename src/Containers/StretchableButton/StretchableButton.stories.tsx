import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
    StretchableButton,
    IStretchableButtonProps,
} from './StretchableButton';

export default {
    title: 'Components/ShiftScheduling/Stretchable Button',
    component: StretchableButton,
    // argTypes:{
    //     defaultHeight: {table:{disable:true}},
    //     defaultPositionX: {table:{disable:true}},
    // }
} as Meta;

const defaultArgs = {
    buttonText: 'Stretchable Button',
    minWidth: '200',
    isDraggable: true,
    topMargin: '50px',
    defaultHeight: '50px', // default value sets at only page load
    defaultPositionX: 100,
};

export const Basic: Story<IStretchableButtonProps> = (args) => (
    <StretchableButton {...args} />
);
Basic.args = { ...defaultArgs };
