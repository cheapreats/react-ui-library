import React from 'react';
import { storiesOf } from '@storybook/react';
import { TransactionStatusTag } from '../components/tags/TransactionStatusTag';

storiesOf('TransactionStatusTag', module)
    .add('with empty', () => (
        <TransactionStatusTag status="Unknown" />
    ), {
        notes: `Enum -> Authorized | Captured`
    })
    .add('with authorized', () => (
        <TransactionStatusTag status="authorized" />
    ), {
        notes: `When the Customer has the balance on the credit card`
    })
    .add('with captured', () => (
        <TransactionStatusTag status="captured" />
    ), {
        notes: `When the Customer's credit card has been charged after authorization`
    });