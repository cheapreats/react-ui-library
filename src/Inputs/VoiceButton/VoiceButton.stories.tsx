import React from 'react';
import { Microphone } from '@styled-icons/fa-solid/Microphone';
import { Meta, Story } from '@storybook/react';
import { VoiceButton } from '../../index';
import { createStoryTitle } from '../../Constants';
import { VoiceButtonProps } from '..';

export default {
    title: createStoryTitle('VoiceButton'),
    component: VoiceButton,
    argTypes: { onClick: { action: 'Button Click Occurred' } },
    args: {
        disabled: false,
        isPulsing: false,
        icon: Microphone,
        iconSize: '30px',
        volume: '0%',
        children: 'Talking...',
    },
} as Meta;

export const Basic: Story<VoiceButtonProps> = (args) => (
    <VoiceButton {...args} />
);
