import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Paragraph, SmallText } from '../components';

storiesOf('Card', module)
    .add('with default', () => (
        <Card padding='8px 25px 20px'>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ), {
        notes: `Padding is optional, added for cosmetic reasons`
    })
    .add('with flat', () => (
        <Card flat>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ), {
        notes: `Removes the box shadow`
    })
    .add('with animated', () => (
        <Card padding='8px 25px 20px' animated>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ), {
        notes: `Adds an hover effect to box`
    })
    .add('with radius', () => (
        <Card padding='8px 25px 20px' radius='40px'>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ), {
        notes: `Default 20px`
    })
    .add('with padding', () => (
        <Card padding='40px'>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ), {
        notes: `Default 20px`
    })
    .add('with margin', () => (
        <Card padding='8px 25px 20px' margin='40px'>
            <Paragraph bold>"Hmmmmmm....... wtf"</Paragraph>
            <SmallText bold>- Jun Zheng 2019</SmallText>
        </Card>
    ), {
        notes: `Default 20px`
    })
;
