import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Status } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Status'), module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Status
            status={text(
                'prepared preparing placed cancelled complete',
                'complete',
            )}
            large={boolean('Large', false)}
        >
            {text('Child Text', 'Test Status Text')}
        </Status>
    ));
