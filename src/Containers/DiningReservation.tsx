import React from 'react';
import { MainTheme } from '../Themes/MainTheme';
import { Modal } from './Modal';
import { Input, Datepicker, Timepicker, Button } from '..';

interface DiningReservationProps {
    modalState: any;
}

export const DiningReservation: React.FC<DiningReservationProps> = ({
    modalState,
}): React.ReactElement => {
    return (
        <>
            <Button
                style={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    marginRight: '20px',
                    marginBottom: '20px',
                }}
                onClick={() => modalState[1](true)}
            >
                Create Booking
            </Button>
            <Modal state={modalState} padding="40px">
                <Input
                    name="bookings"
                    label="How many people are u booking for?"
                    placeholder="Enter number of people you are booking for"
                />
                <Datepicker name="date" label="Pick a date" />

                <Timepicker name="time" label="Pick a time" theme={MainTheme} />
                <Input
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    type="number"
                />
                <Button
                    style={{
                        marginTop: '10px',
                    }}
                >
                    Confirm Booking
                </Button>
            </Modal>
        </>
    );
};
