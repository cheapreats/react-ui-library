import React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal/Modal';
import { Input, Datepicker, Timepicker, Button } from '../../index';

export interface DiningReservationProps {
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const DiningReservation: React.FC<DiningReservationProps> = ({
    modalState,
}): React.ReactElement => (
    <>
        <CreateBooking onClick={(): void => modalState[1](true)}>
            Create Booking
        </CreateBooking>
        <Modal state={modalState} padding="40px">
            <Input
                name="bookings"
                label="How many people are u booking for?"
                placeholder="Enter number of people you are booking for"
            />
            <Datepicker name="date" label="Pick a date" />

            <Timepicker name="time" label="Pick a time" />
            <Input
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                type="number"
            />
            <ConfirmBooking>Confirm Booking</ConfirmBooking>
        </Modal>
    </>
);

const ConfirmBooking = styled(Button)`
    margin-top: 10px;
`;

const CreateBooking = styled(Button)`
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 20px;
    margin-bottom: 20px;
`;
