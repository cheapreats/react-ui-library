import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IStoreSettingsCard, StoreSettingsCard } from './StoreSettingsCard';

export default {
    title: 'Terminal/Settings/StoreSettingsCard',
    component: StoreSettingsCard,
    argTypes: {
        onToggleAutomaticStartOrderPreparation: {action: "Toggled Automatic Start Order"},
        onToggleStoreStatus: {action: "Toggled Store Status"},
        onToggleAcceptingOrders: {action: "Toggled Accepting Orders"}
    },
    args: {
        header: 'Store Information',
        storeNameLabel: 'Store Name',
        storeName: 'Nasir Hotdogs',
        vendorIdLabel: 'Vendor ID',
        vendorId: '2342143243',
        storeStatusLabel: 'Store Status',
        storeStatus: 'Open',
        isAcceptingOrders: true,
        isLoadingAcceptingOrdersStatus: false,
        isStoreClosed: false,
        isAutomaticallyStartingOrderPreparation: true,
        storeClosedLabel: 'Store Closed',
        startTime: '0:00',
        endTime: '4:30',
        /* A Sorted array of store hours */
        storeHours: [{from: '0:00', to: '0:30'}, {from: '2:30', to: '4:30'}]
    },
} as Meta;

export const Basic: Story<IStoreSettingsCard> = (args) => (
    <StoreSettingsCard {...args}/>
);
