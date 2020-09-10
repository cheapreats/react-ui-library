import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box} from '../../src';
import { withKnobs, boolean} from '@storybook/addon-knobs';

storiesOf('Box', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Box>
            Hello
        </Box>
    ))
    .add('with selected', () => (
        <Box selected={boolean('selected', false)}>
            Hello
        </Box>
    ))