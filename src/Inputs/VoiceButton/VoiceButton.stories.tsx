import React from 'react';
import { Microphone } from '@styled-icons/fa-solid/Microphone';
import { Meta, Story } from '@storybook/react';
import { VoiceButton} from '../../index'; 
import { createStoryTitle, getCaptionForLocale } from '../../Constants';
import { VoiceButtonProps } from '..';

export default {
    title: createStoryTitle('VoiceButton'),
    component: VoiceButton,
    argTypes: { onClick: { action: 'Button Click Occurred' } },
    args: {
        disabled: false,
        pulsing: false,
        icon: Microphone,
        iconSize: '14px',
        children: 'Talking...',
    },
} as Meta;

export const Basic: Story<VoiceButtonProps> = (args) => (
    <VoiceButton {...args}></VoiceButton>
);
