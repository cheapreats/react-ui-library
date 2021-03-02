import React from 'react';
import { Story, Meta } from '@storybook/react';
import {ReservationSideBar, IReservationSideBar} from "./ReservationSideBar";
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('ReservationSideBar'),
    component: ReservationSideBar,
} as Meta;

const Template: Story<IReservationSideBar> = (args) => <ReservationSideBar {...args} />;

export const ReservationSideBarComponent = Template.bind({});

ReservationSideBarComponent.args = {
    listOfTables:[
        {
            tableID: 'T1',
            partyName : 'Corey Taylor',
            occupancyStatus : 'Vacant',
            time: '4:00 PM',
            tableUse : 'TableForManagement'
        }
    ]
}