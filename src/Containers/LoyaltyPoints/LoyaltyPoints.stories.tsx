import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LoyaltyPointsProps, LoyaltyPoints } from '../../index';

export default {

    title: 'Components/LoyaltyPoints',
    component: LoyaltyPoints,
    args: {
        loyaltyAmount: 10,
        loyaltyPointLimit: 100,
    }
} as Meta;

export const Basic: Story<LoyaltyPointsProps> = (args) => (
    <LoyaltyPoints {...args} />
)