import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Column, Row, Paragraph as P, HeadingTwo } from '../components';
import { storiesOf } from '@storybook/react';

const Paragraph = styled(P)`
    margin: 10px;
    padding: 10px;
    background-color: rgba(0,0,0,0.1);
    ${ ({ grow }) => grow ? 'flex-grow: 1;' : '' }
`;

storiesOf('Grid', module)
    .add('with col', () => (
        <Row>
            {
                new Array(12).fill(0).map((i, k) => (
                    <Column col={ k + 1 }>
                        <Paragraph bold>Col { k + 1 }</Paragraph>
                    </Column>
                ))
            }
        </Row>
    ), {
        notes: `With no spacing, spacing requires you to do padding with column`
    })
    .add('with simple media', () => (
        <Row>
            <Column media='12' col='6'>
                <Paragraph bold>50% when greater than 880px, then 100% if less</Paragraph>
            </Column>
        </Row>
    ), {
        notes: `Passing just a string/number would use the default width of 880px`
    })
    .add('with complex media', () => (
        <Row>
            <Column media={{ 1000: 10, 900: 8, 700: 6, 500: 4 }} col='12'>
                <Paragraph bold>Very fancy media queries</Paragraph>
            </Column>
        </Row>
    ), {
        notes: `
            Passing just an object where the width as
                {
                    [width size breakpoint]: [col width]
                }
            would create an array of media queries.
        `
    })
    .add('with complex media + styles', () => (
        <Row>
            <Column media={{
                1000: {
                    col: 10,
                    styles: `
                        background-color: red;
                        padding: ${ ({ col }) => col + 'px' };
                    `
                }
            }} col='12'>
                <Paragraph bold>Because responsive layout isn't enough</Paragraph>
            </Column>
        </Row>
    ), {
        notes: `

        `
    })
    .add('with right', () => (
        <Row>
            <Column col='3'>
                <Paragraph bold>Very fancy media queries</Paragraph>
            </Column>
            <Column right col='3'>
                <Paragraph bold>Very fancy media queries</Paragraph>
            </Column>
        </Row>
    ), {
        notes: `Adding right would push the item all the way to the right`
    })
    .add('with row alignment', () => {
        const titles = ['Top', 'Bottom', 'Center', 'Stretch'];
        return <Fragment>
            {
                titles.map((align, k) => (
                    <Fragment>
                        <HeadingTwo bold>{ titles[k] }</HeadingTwo>
                        <Row {...{ [align.toLowerCase()]: true }} key={k}>
                            <Column col='4'>
                                <Paragraph bold>A</Paragraph>
                                <Paragraph bold>Very</Paragraph>
                                <Paragraph bold>Long</Paragraph>
                                <Paragraph bold>Column</Paragraph>
                            </Column>
                            <Column col='4'>
                                <Paragraph bold>A</Paragraph>
                                <Paragraph bold>Long</Paragraph>
                                <Paragraph grow bold>Column</Paragraph>
                            </Column>
                            <Column col='4'>
                                <Paragraph bold>A</Paragraph>
                                <Paragraph grow bold>Column</Paragraph>
                            </Column>
                        </Row>
                    </Fragment>
                ))
            }
        </Fragment>
    }, {
        notes: `By default it is the top`
    })
    .add('with column alignment', () => {
        return <Fragment>
            <Row>
                <Column col='2'>
                    <Paragraph bold>Some Height</Paragraph>
                    <Paragraph bold>For Demo</Paragraph>
                </Column>
                <Column top col='2'>
                    <Paragraph bold>Top</Paragraph>
                </Column>
                <Column bottom col='2'>
                    <Paragraph bold>Bottom</Paragraph>
                </Column>
                <Column center col='2'>
                    <Paragraph bold>Center</Paragraph>
                </Column>
                <Column stretch col='2'>
                    <Paragraph grow bold>Stretch</Paragraph>
                </Column>
            </Row>
        </Fragment>
    }, {
        notes: `By default it is top, overrides alignment from row`
    })
;