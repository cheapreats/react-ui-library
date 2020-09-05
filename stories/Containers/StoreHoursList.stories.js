import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoreHoursList } from '../../src';

storiesOf('StoreHoursList', module)
    .add('with default', () => (
        <StoreHoursList/>
    ))