import React from 'react';
import { storiesOf } from '@storybook/react';
import { SimpleCard } from '../components/cards/cards';

storiesOf('Card', module)
    .add('SimpleCard', () => (
        <SimpleCard 
            percentage={'30'} 
            textOne="hello"
            textTwo="this is some content" 
            textThree="here is something"
            textFour="hello again"
            bold
        />
    ), {
        notes: `A Simple Card`
    })