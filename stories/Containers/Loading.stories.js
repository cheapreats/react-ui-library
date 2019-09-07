import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Loading } from '../../src';

storiesOf('Loading', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Loading loading={boolean('Loading', true)}>Boo!</Loading>
    ));
