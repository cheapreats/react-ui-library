import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    SeatingInfoInput,
    ISeatingInfoInput,
} from '@Containers/SeatingInfoInput/SeatingInfoInput';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('SeatingInfoInput'),
    component: SeatingInfoInput,
} as Meta;

const handleSeatCustomerClick = () => {
    console.log('SeatCustomer Button has been clicked.');
};

const handleBackButtonClick = () => {
    console.log('Back Button has been clicked.');
};

const handleAddToWaitListClick = () => {
    console.log('AddToWaitList button has been clicked');
};

const handleEndReservationClick = () => {
    console.log('EndReservation button has been clicked');
};

const Template: Story<ISeatingInfoInput> = (args) => (
    <SeatingInfoInput {...args} />
);

export const SeatingInfoInputComponent = Template.bind({});

SeatingInfoInputComponent.args = {
    availableSeatingInfo: [
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
    ],
    onBackButtonClick: handleBackButtonClick,
    onAddToWaitListClick: handleAddToWaitListClick,
    onEndReservationClick: handleEndReservationClick,
    onSeatCustomerClick: handleSeatCustomerClick,
};
