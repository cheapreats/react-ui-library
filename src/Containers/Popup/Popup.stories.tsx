import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Popup, PopupProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Popup'),
    component: Popup,
    args: {
        left: 10,
        top: 10,
        width: 40,
        height: 30,
        popup: true,
        content: 'Content',
    },
} as Meta;

export const Basic: Story<PopupProps> = (args) => <Popup {...args} />;
