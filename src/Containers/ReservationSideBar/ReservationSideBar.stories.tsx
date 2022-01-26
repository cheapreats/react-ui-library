import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ReservationSideBar, IReservationSideBar } from './ReservationSideBar';


export default {
    title: 'Components/TableManagement/ReservationSideBar',
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
