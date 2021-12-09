import React from 'react';
import {Meta, Story} from "@storybook/react";
import {IPartySizeSelector, PartySizeSelector} from "@Inputs/PartySizeSelector/PartySizeSelector";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Components/PartySizeSelector',
    component: PartySizeSelector,
} as Meta;

const Template: Story<IPartySizeSelector> = (args) => <PartySizeSelector {...args} />;

export const PartySizeSelectorComponent = Template.bind({});

PartySizeSelectorComponent.args = {
    onPersonClick: action("person was selected"),
    clientIndexes: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
    partyName: "duck party",
};

