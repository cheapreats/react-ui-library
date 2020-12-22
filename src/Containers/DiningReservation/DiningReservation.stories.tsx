import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { DiningReservation, DiningReservationProps } from './DiningReservation';
import { createStoryTitle } from '../../Constants';

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
        />
    );
};
