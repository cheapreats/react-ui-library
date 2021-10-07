import React from 'react';
import { Microphone } from '@styled-icons/fa-solid/Microphone';
import { Meta, Story } from '@storybook/react';
import { VoiceButton} from '../../index'; 
import { createStoryTitle, getCaptionForLocale } from '../../Constants';

export default {
    title: createStoryTitle('VoiceButton'),
    component: VoiceButton,
    argTypes: { onClick: { action: 'Button Click Occurred' } },
    args: {
        disabled: false,
        icon: Microphone,
        iconSize: '14px',
        contentColor: 'text',
        full: false,
    },
} as Meta;

export const Basic: Story<ButtonProps> = (args) => (
    <VoiceButton {...args}>{getCaptionForLocale(args.children as string)}</VoiceButton>
);
