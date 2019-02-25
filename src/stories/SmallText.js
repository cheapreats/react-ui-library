import React from 'react';
import { storiesOf } from '@storybook/react';
import { SmallText } from '../components';

storiesOf('SmallText', module)
    .add('with text', () => (
        <SmallText text="Banana" />
    ), {
        notes: `Standard Small text for CE`
    })
    .add('with bold', () => (
        <SmallText bold text="Bananas" />
    ), {
        notes: `Standard Small text for CE`
    })
    .add('with children', () => (
        <SmallText>Banana Stand</SmallText>
    ), {
        notes: `Text parameter takes priority over children`
    })
;