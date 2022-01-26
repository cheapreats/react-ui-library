import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Popup, PopupProps } from '../../index';


export default {
    title: 'Components/Other/Popup',
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
