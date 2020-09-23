import React, { Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { MainTheme } from '../../src/Themes/MainTheme';
import {
    Heading,
    ColorCard,
} from '../../src';

const ListGrid = styled.ul`
    list-style-type: none;
    display: grid;
    align-items: end;
    margin: 20px 0;
    padding: 0;
    ${({ columnWidth, gap }) => `
    grid-template-columns: repeat(auto-fill, minmax(${columnWidth}px, 1fr));
    grid-gap: ${gap || 5}px;
    `}
`;

const flattenColors = (value, label) => (
    <Fragment key={label}>
        {Object.entries(value).map(([innerKey, value]) =>
            typeof value === 'object' ? (
                flattenColors(value, `${label}.${innerKey}`)
            ) : (
                <li key={`${label}.${innerKey}`}>
                    <ColorCard
                        color={value}
                        label={`${label}.${innerKey}`}
                    ></ColorCard>
                </li>
            ),
        )}
    </Fragment>
);

storiesOf('Design System/Colors', module)
    .add('Overview', () => (
        <div>
            <Heading type="h1" bold>
                Colors
            </Heading>

            <Heading type="h2">Main Theme</Heading>
            <ListGrid columnWidth={300} gap={15}>
                {Object.entries(MainTheme.colors).map(([key, value]) =>
                    typeof value === 'object' ? (
                        flattenColors(value, key)
                    ) : (
                        <li key={key}>
                            <ColorCard color={value} label={key}></ColorCard>
                        </li>
                    ),
                )}
            </ListGrid>
        </div>
    ));
