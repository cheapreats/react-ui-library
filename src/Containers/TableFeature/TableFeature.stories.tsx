import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { TableFeature, TableFeatureProps } from './TableFeature'; 

const data = [ 
    {
        colOne: 'Uploading payout data',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Verifying recipient data',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Issuing payments',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Reporting payouts',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Tracking balances',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Error handling',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
];

export default {
    title: createStoryTitle('TableFeature'),
    component: TableFeature,
    args: {
        headingOne: 'Simplified payout process',
        headingTwo: 'Automate payout workflows',
        title:      'Automated payouts',
        paragh:     'Stop uploading spreadsheets and juggling multiple payout providers. Use a single integration to automate hours of operational overhead and reduce opportunities for human error.',
        /** table data */
        headingColOne: 'Traditional',
        headingColTwo: 'Stripe', 
        data,
        rowsVisible: 3,
 
    },
} as Meta;
  

const Table: Story<TableFeatureProps> = (args) => (
    <>
        <TableFeature {...args} />
    </>
);

export const Basic = Table.bind({});
Basic.args = Basic.args