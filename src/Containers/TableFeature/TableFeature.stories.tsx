import React from 'react';
<<<<<<< HEAD
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
=======
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { TableFeature, TableFeatureProps } from './TableFeature'; 
   
const TableComp = styled.table` 
    width: 100%;
    text-align: left;
    border-collapse:collapse;
    overflow: hidden;
`;
const TableBodyComp = styled.tbody`
    background-color: #18395a;
    border-radius: 10px;
    color: #fff;
 
`;
const TableTrComp = styled.tr`
    :nth-child(even) {background: #274869}
`;
const TableThComp = styled.th`
    font-weight: bold;
    padding: .6rem;
`;
const TableTdComp = styled.td` 
    padding: .8rem;
`;

const ChildElement = (
   
    <TableComp>
        <thead> 
            <tr>
                <TableThComp />
                <TableThComp>Traditional</TableThComp>
                <TableThComp>Automatic</TableThComp>
            </tr>
        </thead>
        <TableBodyComp>
            <TableTrComp>
                <TableTdComp style={{borderTopLeftRadius:'10px'}}>Verifying recipient data</TableTdComp>
                <TableTdComp>Manual</TableTdComp>
                <TableTdComp style={{borderTopRightRadius:'10px'}}>Automatic</TableTdComp>
            </TableTrComp>
            <TableTrComp>
                <TableTdComp>Issuing payments</TableTdComp>
                <TableTdComp>Manual</TableTdComp>
                <TableTdComp>Automatic</TableTdComp>
            </TableTrComp>
            <TableTrComp>
                <TableTdComp>Reporting payouts</TableTdComp>
                <TableTdComp>Manual</TableTdComp>
                <TableTdComp>Automatic</TableTdComp>
            </TableTrComp>
            <TableTrComp>
                <TableTdComp>Tracking balances</TableTdComp>
                <TableTdComp>Manual</TableTdComp>
                <TableTdComp>Automatic</TableTdComp>
            </TableTrComp>
            <TableTrComp>
                <TableTdComp style={{borderBottomLeftRadius:'10px'}}>Error handling</TableTdComp>
                <TableTdComp>Manual</TableTdComp>
                <TableTdComp style={{borderBottomRightRadius:'10px'}}>Automatic</TableTdComp>
            </TableTrComp>
        </TableBodyComp>
    </TableComp>
);
>>>>>>> 481adfd89b7239f7031a2ab7f30c443f5a18dbc1

export default {
    title: createStoryTitle('TableFeature'),
    component: TableFeature,
    args: {
        headingOne: 'Simplified payout process',
        headingTwo: 'Automate payout workflows',
<<<<<<< HEAD
        title:      'Automated payouts',
        paragh:     'Stop uploading spreadsheets and juggling multiple payout providers. Use a single integration to automate hours of operational overhead and reduce opportunities for human error.',
        /** table data */
        headingColOne: 'Traditional',
        headingColTwo: 'Stripe', 
        data,
        rowsVisible: 3,
=======
        title:'Automated payouts',
        paragh:'Stop uploading spreadsheets and juggling multiple payout providers. Use a single integration to automate hours of operational overhead and reduce opportunities for human error.',
        ChildElement, 
>>>>>>> 481adfd89b7239f7031a2ab7f30c443f5a18dbc1
    },
} as Meta;
  

const Table: Story<TableFeatureProps> = (args) => (
    <>
        <TableFeature {...args} />
    </>
);

export const Basic = Table.bind({});
Basic.args = Basic.args