import React from 'react';
import { Meta, Story } from '@storybook/react';
import { EmojiPicker, EmojiPickerProps } from '../../index';


export default {
    title: 'Components/Emoji picker',
    component: EmojiPicker,
    argTypes: { onChange: { action: 'Emoji picked' } },
    args: {
        showEmoji: false,
        text: 'Select an emoji',
    },
} as Meta;

export const Basic: Story<EmojiPickerProps> = (args) => (
    <EmojiPicker {...args} />
);
