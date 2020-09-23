import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Footnote, SmallText } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Footnote'), module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Footnote show={boolean('Show', true)}>
            <SmallText bold>
                {text('Footnote Text', 'Toggle the show knob to hide me!')}
            </SmallText>
        </Footnote>
    ));
