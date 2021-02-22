/*
    Created by:                Dmytro Boichuk
    Date submitted (v1):       2/16/2021
    File:                      AddTableToolbar.stories.js

*/

import React from 'react';
import { Meta, Story } from '@storybook/react';
import {AddTableToolbar,IAddTableToolbar} from '@Containers/AddTableToolbar/AddTableToolbar';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('AddTableToolbar'),
    component: AddTableToolbar,
} as Meta;

const Template: Story<IAddTableToolbar> = (args) => (
    <AddTableToolbar {...args} />
);

/**
 *Creates a RectangleTable component with 2 chairs
 */

export const TableToolbar = Template.bind({});



