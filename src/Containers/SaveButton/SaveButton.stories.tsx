import React from 'react';
import { Save } from '@styled-icons/fa-solid/Save';
import { Meta, Story } from '@storybook/react';
import { SaveButton, SaveButtonProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Save Button'),
    component: SaveButton,
    argTypes: { action: { action: 'Button Click Occurred' } },
    args: {
        show: true,
        disabled: false,
        primary: true,
        loading: false,
        color: 'primary',
        icon: Save,
        full: false,
        text: 'Text',
        buttonText: 'ButtonText',
        disabledMessage: 'DisabledMessage'
    },
} as Meta;

export const Basic: Story<SaveButtonProps> = (args) => (
    <SaveButton {...args} />
);
