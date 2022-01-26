import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TabFeature, TabFeatureProps } from './TabFeature';


/** data */
const heading = 'How it works';
const subheading = 'Banking-as-a-service';
const description =
    'Stripe Treasury provides the modular components you need to build a full-featured, scalable financial product for your customers. We’ve partnered with global banks to enable ACH and wire transfers, interest-earning accounts, and faster access to payments funds, all within your platform.';
const navheading = 'Building blocks for financial services';
const DataItems = [
    {
        title: 'Create accounts',
        shortdescription:
            'Create an account object with a single API request. Onboard users, verify identity, and provision an account with one of our bank partners in minutes.',
        liItems: [
            'ID verification',
            'KYC checks',
            'OFAC and sanctions screening',
            'MATCH list checks',
        ],
        codeBlock: 'CodeBlock = () { code one here }',
    },
    {
        title: 'Store funds',
        shortdescription:
            'Establish a store of funds and configure the properties of your financial product.',
        liItems: [
            'FDIC insurance',
            'Interest-earning',
            'Account number',
            'Routing number',
            'IBAN address',
            'Multi-currency support',
            'Pending and available balances',
        ],
        codeBlock: 'CodeBlock = () { code two here }',
    },
    {
        title: 'Move money',
        shortdescription:
            'Enable different ways to transfer funds in and out of an account.',
        liItems: [
            'Domestic and international wires',
            'Same-day ACH settlement',
            'Check deposit',
            'Faster payments settlement',
            'Add to your balance',
            'Credit returns on debits',
        ],
        codeBlock: 'CodeBlock = () { code three here }',
    },
    {
        title: 'Pay bills',
        shortdescription:
            'Add bill pay to let customers make one-time or recurring payments to vendors or third parties.',
        liItems: [
            'Send money to an external address',
            'Add saved vendors',
            'Recurring bill payment',
        ],
        codeBlock: 'CodeBlock = () { code code four here }',
    },
    {
        title: 'Attach payment cards',
        shortdescription:
            'Issue custom payment cards to give users more ways to spend their funds.',
        liItems: [
            'Branded physical and virtual cards',
            'Provision virtual cards to digital wallets',
            'Ship physical cards in two business days',
            'Dynamic spend controls',
            'Real-time authorizations',
            'Access funds at ATMs',
        ],
        codeBlock: 'CodeBlock = () { code five here }',
    },
];

export default {
    title: 'Marketing Website/TabFeature',
    component: TabFeature,
    args: {
        heading,
        subheading,
        description,
        navheading,
        DataItems,
    },
} as Meta;

export const Basic: Story<TabFeatureProps> = (args) => <TabFeature {...args} />;
