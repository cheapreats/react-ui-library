import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ReservationSideBar, IReservationSideBar } from './ReservationSideBar';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('ReservationSideBar'),
    component: ReservationSideBar,
} as Meta;

const Template: Story<IReservationSideBar> = (args) => (
    <ReservationSideBar {...args} />
);

export const ReservationSideBarComponent = Template.bind({});

ReservationSideBarComponent.args = {
    SeatedList: [],
    WaitingRoomList: [],
    AvailableRoomsList: ['Dining Room', 'Kitchen', 'Living Room', 'Patio'],
};
