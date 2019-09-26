import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { List } from '../../src';

storiesOf('List', module)
    .addDecorator(withKnobs)
    .add('with default', () => <List label={text('Label', 'List Label')} />);
