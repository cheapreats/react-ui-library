import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from '../components/texts/Link';

storiesOf('Link', module)
    .add('with text', () => (
        <Link href='https://cheapreats.com'>Click to see more Ralphs</Link>
    ))
    .add('with bold', () => (
        <Link href='https://cheapreats.com' bold>Click to see way more Ralphs</Link>
    ))
;