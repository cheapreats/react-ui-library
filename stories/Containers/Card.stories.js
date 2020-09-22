import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Paragraph, SmallText } from '../../src';
import {COMPONENTS_TITLE, createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Card'), module)
    .add('with default', () => (
        <Card>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ))
    .add('with flat', () => (
        <Card flat>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ))
    .add('with animated', () => (
        <Card animated>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ));
