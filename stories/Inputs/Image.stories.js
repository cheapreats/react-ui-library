import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Image } from '../../src';

storiesOf('Image', module)
    .addDecorator(withKnobs)
    .add('with default', () => <Image />);
