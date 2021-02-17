import React from 'react';
import { Story, Meta } from '@storybook/react';
import {EditControlPanel, IEditControlPanel} from "./EditControlPanel";
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('EditControlPanel'),
    component: EditControlPanel,
} as Meta;

const Template: Story<IEditControlPanel> = (args) => (
    <EditControlPanel {...args} />
);

export const EditControlPanelComponent = Template.bind({});
