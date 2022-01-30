import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ITodaysStoreHours, TodaysStoreHours } from "./TodaysStoreHours";

export default {
    title: 'Terminal/Settings/todaysStoreHours',
    component: TodaysStoreHours,
    argTypes: {
    },
    args: {
        storeClosedLabel: 'Store Closed',
        startTime: '0:00',
        endTime: '4:30',
        /* A Sorted array of store hours */
        storeHours: [{from: '0:00', to: '0:30'}, {from: '2:30', to: '4:30'}]
    },
} as Meta;

export const Basic: Story<ITodaysStoreHours> = (args) => (
    <TodaysStoreHours {...args}/>
);
