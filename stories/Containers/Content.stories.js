import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Content, SmallText } from '../../src';

storiesOf('Content', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Content withList={boolean("withList tablet media query", false)}>
            <SmallText bold>
                Text Here
            </SmallText>
        </Content>
    ));