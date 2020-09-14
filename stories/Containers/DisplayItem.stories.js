import React from 'react';
import { storiesOf } from '@storybook/react';
import { DisplayItem } from '../../src';

storiesOf('DisplayItem', module).add(
    'with default',
    () => (
        <DisplayItem 
            label='DisplayItemLabel'
            value='DisplayItemValue'
        />
    ),
    {},
);