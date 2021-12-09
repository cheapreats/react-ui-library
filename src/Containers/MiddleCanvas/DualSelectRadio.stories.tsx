import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DualSelectRadio, DualSelectRadioProps } from '../../index';


export default {
    title: 'Components/Dual Select Radio',
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
