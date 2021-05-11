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

/**
 * Prints to the console when SeatCustomer button has been hit
 */
const handleSeatCustomerClick = () => {
    console.log('SeatCustomer Button has been clicked.');
};

/**
 * Prints to the console when Back button has been hit
 */
const handleBackButtonClick = () => {
    console.log('Back Button has been clicked.');
};

/**
 * Prints to the console when AddToWaitList button has been hit
 */
const handleAddToWaitListClick = () => {
    console.log('AddToWaitList button has been clicked');
};

/**
 * Prints to the console when EndReservation button has been hit
 */
const handleEndReservationClick = () => {
    console.log('EndReservation button has been clicked');
};

const Template: Story<ISeatingInfoInput> = (args) => (
    <SeatingInfoInput {...args} />
);

/**
 *Creates SeatingInfoComponent
 */
export const SeatingInfoInputComponent = Template.bind({});

SeatingInfoInputComponent.args = {
    availableSeatingInfo: [
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Vacant',
            time: '4:00 PM',
            partySize: 5,
            location: 'Classic Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
            location: 'Classic Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
            location: 'Classic Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Vacant',
            time: '4:00 PM',
            partySize: 5,
            location: 'Classic Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Occupied',
            time: '4:00 PM',
            partySize: 5,
            location: 'Green Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
            location: 'New Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Occupied',
            time: '4:00 PM',
            partySize: 5,
            location: 'New Room',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Vacant',
            time: '4:00 PM',
            partySize: 5,
            location: 'Kitchen',
        },
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
            location: 'Bed Room',
        },
    ],
    onBackButtonClick: handleBackButtonClick,
    onAddToWaitListClick: handleAddToWaitListClick,
    onEndReservationClick: handleEndReservationClick,
    onSeatCustomerClick: handleSeatCustomerClick,
};
