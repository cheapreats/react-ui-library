import React from 'react';
import { Meta, Story } from '@storybook/react';
import { KitchenStatusModel, KitchenStatusModelProps } from '../../index';
import { statusEnum} from './StatusButton';
import { createStoryTitle} from '../../Constants';

export default {
    title: createStoryTitle('KitchenStatusModel'),
    component: KitchenStatusModel,
    args: {
        minuteAmounts: [10, 20, 30, 40],
        statusBarColorArray: ['green', 'yellow', 'red'],
        statusHeaderArray: ['Normal', 'Busy', 'Pause'],
        statusBodyArray: ['Business as usual', 'Need more prep time', 'Pause new orders'],
        statusIndexArray: [0, 1, 2],
    },
} as Meta;

const Template: Story<KitchenStatusModelProps> = (args) => (
    <KitchenStatusModel {...args}/>
);

export const BasicStatus = Template.bind({});
BasicStatus.args = {

};

export const PauseBox = Template.bind({});
PauseBox.args = {
    status: statusEnum.Pause,
};