import React from 'react';
import { EmojiPicker, EmojiPickerProps } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Emoji picker'),
    component: EmojiPicker,
    argTypes: { onChange: { action: 'Emoji picked' } },
    args: {
        showEmoji: false,
        text: 'Select an emoji',
    },
} as Meta;

export const Basic: Story<EmojiPickerProps> = (args) => (
    <EmojiPicker {...args}></EmojiPicker>
);
