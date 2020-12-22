import React from 'react';
import { CircleTable, ICircleTable } from './CircleTable';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { occupancyStatusTypes } from "@Containers";

export default {
    title: createStoryTitle('CircleTable'),
    component: CircleTable,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<ICircleTable> = (args) => <CircleTable {...args} />;

/**
 *Creates a CircleTable component with these args passed in
 */

export const Primary = Template.bind({});

Primary.args = {
    tableID: 'T4',
    numOfChairs: 4,
    partyName: 'Scott',
    reservationTime: new Date(2020, 10, 15, 16, 30, 0, 0),
    occupancyStatus: occupancyStatusTypes.Reserved,
};
