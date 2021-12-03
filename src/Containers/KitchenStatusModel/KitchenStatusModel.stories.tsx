import React from 'react';
import { Meta, Story } from '@storybook/react';
import { KitchenStatusModel, KitchenStatusModelProps } from '../../index';
import { createStoryTitle} from '../../Constants';

export default {
    title: createStoryTitle('KitchenStatusModel'),
    component: KitchenStatusModel,
    argTypes: {
        onPauseClick: {action: 'Paused For'},
        onStatusClick: {action: 'Current Status'},
        onUpdateClick: {action: 'Update Status'}
    },
    args: {
        minuteAmounts: [10, 20, 30, 40],
        statusBox: [
            {
                status: 0,
                color: 'green',
                header: 'Normal',
                body: 'Business as usual',
            },
            {
                status: 1,
                color: 'yellow',
                header: 'Busy',
                body: 'Need more prep time',
            },
            {
                status: 2,
                color: 'red',
                header: 'Pause',
                body: 'Pause new orders',
            },
        ],
    },
} as Meta;

export const Basic: Story<KitchenStatusModelProps> = (args) => (
    <KitchenStatusModel {...args}/>
);