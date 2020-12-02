import React from 'react';
import {IRectangleTable2, RectangleTable2} from '../../src/Containers/RectangleTable2';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('RectangleTable2'),
    component: RectangleTable2,
} as Meta;

const Template: Story<IRectangleTable2> = (args) => <RectangleTable2 {...args} />;

/**
 *Creates a RectangleTable component with 7 chairs
 */
export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Vacant',
    chairs: [
        { position: 'top', isSeated: true, occupiedBy: 'Scott', isVisible: true },
        { position: 'top', isSeated: false, occupiedBy: '', isVisible: true },
        { position: 'bottom', isSeated: false, occupiedBy: '', isVisible: true },
        { position: 'bottom', isSeated: true, occupiedBy: 'Sam', isVisible: true }
    ]
};
