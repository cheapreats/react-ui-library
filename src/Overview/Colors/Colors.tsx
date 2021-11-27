import React, { Fragment } from 'react';
import styled from 'styled-components';
import { MainTheme } from '@Themes/MainTheme';
import { DarkTheme } from '@Themes/DarkTheme';
import { ColorCard, Heading } from '../../index';

export interface ColorsProps {}

interface IListGridProps {
    columnWidth: number;
    gap: number;
}

const ListGrid = styled.ul<IListGridProps>`
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

const flattenColors = (Value: string, label: string) => (
    <Fragment key={label}>
        {Object.entries(Value).map(([innerKey, value]) =>
            typeof value === 'object' ? (
                flattenColors(value, `${label}.${innerKey}`)
            ) : (
                <li key={`${label}.${innerKey}`}>
                    <ColorCard color={value} label={`${label}.${innerKey}`} />
                </li>
            ),
        )}
    </Fragment>
);

const Colors: React.FC<ColorsProps> = () => (
    <div>
        <Heading type="h1" bold>
            Colors
        </Heading>

        <Heading type="h2">Main Theme</Heading>
        <ListGrid columnWidth={300} gap={15}>
            {Object.entries(MainTheme.colors).map(([key, value]) =>
                typeof value === 'object' ? (
                    flattenColors(value as any, key)
                ) : (
                    <li key={key}>
                        <ColorCard color={value} label={key} />
                    </li>
                ),
            )}
        </ListGrid>

        <Heading type="h2">Dark Theme</Heading>
        <ListGrid columnWidth={300} gap={15}>
            {Object.entries(DarkTheme.colors).map(([key, value]) =>
                typeof value === 'object' ? (
                    flattenColors(value as any, key)
                ) : (
                    <li key={key}>
                        <ColorCard color={value} label={key} />
                    </li>
                ),
            )}
        </ListGrid>
        
    </div>
)

export default Colors;