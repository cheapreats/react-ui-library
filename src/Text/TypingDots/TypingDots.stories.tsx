import React from 'react';
import { Meta, Story } from '@storybook/react';
import TypingDots, { ITypingDotsProps } from './TypingDots';

export default {
    title: 'Components/Typing Indicator Dots',
    component: TypingDots
} as Meta;

export const Basic: Story<ITypingDotsProps> = () => (
    <TypingDots num={3} delayStep={0.1}/>
);
