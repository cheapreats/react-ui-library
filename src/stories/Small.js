import React from 'react';
import { storiesOf } from '@storybook/react';
import { Small } from '../components';

storiesOf('Small', module)
    .add('with text', () => (
        <Small text="Banana" />
    ), {
        notes: `Standard Small text for CE`
    })
;