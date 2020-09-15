import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { ScrollableListContent, SmallText } from '../../src';

storiesOf('ScrollableListContent', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <ScrollableListContent withList={boolean("withList tablet media query", false)}>
            <SmallText bold>
                Text Here
            </SmallText>
        </ScrollableListContent>
    ));