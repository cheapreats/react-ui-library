import React from 'react';
import { Story, Meta } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { StretchableButton, IStretchableButtonProps } from './StretchableButton';

export default {
    title: createStoryTitle('Stretchable Button'),
    component: StretchableButton,
    argTypes:{
        defaultHeight: {table:{disable:true}},
        defaultPositionX: {table:{disable:true}},
        defaultPositionY:{table:{disable:true}},
    }
} as Meta;

const defaultArgs = {
    buttonText: 'Stretchable Button',
    minWidth: '200px',
    isDraggable: true,
    defaultHeight: "50px",
    defaultPositionX: 100,
    defaultPositionY: 0,
};

export const Basic: Story<IStretchableButtonProps> = (args) => (
    <StretchableButton {...args} />
);
Basic.args = { ...defaultArgs };