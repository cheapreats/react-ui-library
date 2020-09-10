import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Paragraph } from '../../src';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

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