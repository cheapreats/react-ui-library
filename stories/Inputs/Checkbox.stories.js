import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Checkbox } from '../../src';

storiesOf('Checkbox', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Checkbox name="demo" label="This is a checkbox" />
    ));
