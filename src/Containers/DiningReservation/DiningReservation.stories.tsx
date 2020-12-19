import React, { useState } from 'react';
import {
    DiningReservation,
    DiningReservationProps,
} from './DiningReservation';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Dining Reservation'),
    component: DiningReservation,
} as Meta;

export const Basic: Story<DiningReservationProps> = (args) => {
    const modalState = useState(false);

    return (
        <DiningReservation
            {...args}
            modalState={modalState}
        ></DiningReservation>
    );
};
