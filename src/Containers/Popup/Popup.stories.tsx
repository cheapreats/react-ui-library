import React from 'react';
import { storiesOf } from '@storybook/react';
import { Popup, PopupProps } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

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
