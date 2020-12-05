import React from 'react';
import { DualSelectRadio, DualSelectRadioProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Dual Select Radio'),
    component: DualSelectRadio,
    args: {
        caption: 'Dual Select',
        leftPlaceholder: 'Light/Sound',
        headerSpacingStyle: 'space-between',
        dualSelectOptions: {
            LIGHT: {
                title: 'Light',
                labels: ['Flash Once', 'Flash Twice'],
            },
            SOUND: {
                title: 'Sound',
                labels: ['Beep Once', 'Beep Twice'],
            },
        },
    },
} as Meta;

export const Basic: Story<DualSelectRadioProps> = (args) => (
    <DualSelectRadio {...args} />
);
