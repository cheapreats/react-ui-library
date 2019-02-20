import React from 'react';
import { storiesOf } from '@storybook/react';
import { SimpleCard } from '../components/cards/cards';

storiesOf('Card', module)
    .add('SimpleCard', () => (
        <SimpleCard percentage={'30'}
        />
    ), {
        notes: `A Simple Card`
    })