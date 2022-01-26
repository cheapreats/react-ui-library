import React from 'react';
import { Meta, Story } from '@storybook/react';

import { TableFeature, TableFeatureProps } from './TableFeature';

const data = [
    {
        reportName: 'Uploading payout data',
        reportManual: 'Manual',
        reportAuto: 'Automatic',
    },
    {
        reportName: 'Verifying recipient data',
        reportManual: 'Manual',
        reportAuto: 'Automatic',
    },
    {
        reportName: 'Issuing payments',
        reportManual: 'Manual',
        reportAuto: 'Automatic',
    },
    {
        reportName: 'Reporting payouts',
        reportManual: 'Manual',
        reportAuto: 'Automatic',
    },
    {
        reportName: 'Tracking balances',
        reportManual: 'Manual',
        reportAuto: 'Automatic',
    },
    {
        reportName: 'Error handling',
        reportManual: 'Manual',
        reportAuto: 'Automatic',
    },
];

export default {
    title: 'Marketing Website/TableFeature',
    component: TableFeature,
    args: {
        heading: 'Simplified payout process',
        subHeading: 'Automate payout workflows',
        title: 'Automated payouts',
        description:
            'Stop uploading spreadsheets and juggling multiple payout providers. Use a single integration to automate hours of operational overhead and reduce opportunities for human error.',
        traditional: 'Traditional',
        stripe: 'Stripe',
        rowsVisible: 3,
        data,
    },
} as Meta;

const Table: Story<TableFeatureProps> = (args) => <TableFeature {...args} />;

export const Basic = Table.bind({});
