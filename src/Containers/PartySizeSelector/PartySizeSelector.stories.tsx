import React from 'react';
import {Meta, Story} from "@storybook/react";
import {IPartySizeSelector, PartySizeSelector} from "@Containers/PartySizeSelector/PartySizeSelector";
import {createStoryTitle} from "../../Constants";

export default {
    title: createStoryTitle('PartySizeSelector'),
    component: PartySizeSelector,
} as Meta;

const Template: Story<IPartySizeSelector> = (args) => <PartySizeSelector {...args} />;

export const PartySizeSelectorComponent = Template.bind({});

PartySizeSelectorComponent.args = {
}