import React from 'react';
import { CircleTable2, ICircleTable2 } from '../../src/Containers';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('CircleTable2'),
    component: CircleTable2,
} as Meta;

const Template: Story<ICircleTable2> = (args) => <CircleTable2 {...args} />;

enum occupancyStatusTypes {
    Vacant = 'Vacant',
    Reserved = 'Reserved',
    Occupied = 'Occupied',
}

/**
 *Creates a SquareTable component with 4 chairs
 */

export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: occupancyStatusTypes.Vacant,
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Dean',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            isRound: true,
        },
    ],
};
