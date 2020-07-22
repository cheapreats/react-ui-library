import React from 'react';
import { storiesOf } from '@storybook/react';
import { TransactionCard } from '../../src/Containers/TransactionCard';
import { Scissors } from '@styled-icons/entypo/Scissors';
import { Documents } from '@styled-icons/entypo/Documents';
import { Cross } from '@styled-icons/entypo/Cross';
import { User } from '@styled-icons/boxicons-solid/User';

const data = [
    {
        icon: <Scissors size="40" color="white" />,
        title: "$100.00 off discount applied to the customer's account ",
        time: '3 days ago',
    },
    {
        icon: <Documents size="40" color="white" />,
        title: 'Changed subscription from bronze plan to gold plan',
        time: '1 day ago',
    },
    {
        icon: <Cross size="40" color="white" />,
        title: 'Payment failed and an alert was sent',
        time: '5 hours ago',
    },
    {
        icon: <User size="40" color="white" />,
        title: 'User Amin Ajao was created for testing the dashboard',
        time: '6 hours ago',
    },
];

storiesOf('Transaction', module).add('with default', () => (
    <TransactionCard cardData={data} />
));
