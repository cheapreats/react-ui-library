import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Navigation } from '../../src';

storiesOf('Navigation', module)
    .addDecorator(withKnobs)
    .add('with default', () => <Navigation />);
