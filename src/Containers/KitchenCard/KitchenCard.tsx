import React from 'react';
import styled from 'styled-components';
import { Card as C, CardProps as Cprops } from '../Card';
import { HeaderRow } from '../HeaderRow';
import { Status, StatusColors } from '../Status';
import { Paragraph as P } from '../../Text';
import { flex, media } from '../../Utils/Mixins';
import { KitchenCardItems } from './KitchenCardItems';

const CUSTOMER_FIRST_NAME = /^([\w-]+)/g;
const UNDERSCORE_FORMAT = '_';
const LABEL_FORMAT = -4;

interface Item {
    name: string;
}

export interface KitchenProps {
    customer: {
        name: string;
    };
    _id: string;
    items: Item[];
    orderType: string;
    status: StatusColors;
    index: number;
    modifiers: [];
    isFullName?: boolean;
    cardHeight?: number;
    cardWidth: number;
    cardMargin: number;
    TimeComponent: React.ReactNode | string;
    StatusModifierComponent: React.ReactNode | string;
}

export const KitchenCard: React.FC<KitchenProps> = ({
    customer,
    _id,
    items,
    orderType,
    modifiers,
    status,
    index,
    isFullName = true,
    cardHeight,
    cardWidth,
    cardMargin,
    TimeComponent,
    StatusModifierComponent,
}): React.ReactElement => {
    return (
        <Card
            key={index}
            cardWidth={cardWidth}
            cardMargin={cardMargin}
            cardHeight={cardHeight}
        >
            <HeaderRow
                type="h4"
                label={`#${_id.slice(LABEL_FORMAT)}`}
                display="space-between"
                padding="0 5px"
            >
                <Status status={status}>{status}</Status>
            </HeaderRow>
            <Grid>
                <Paragraph bold align="left">
                    {orderType.replace(UNDERSCORE_FORMAT, ' ').toLowerCase()}
                </Paragraph>
                <Paragraph bold align="center">
                    {customer.name.match(CUSTOMER_FIRST_NAME)}
                </Paragraph>
                <Paragraph bold align="right">
                    {TimeComponent}
                </Paragraph>
            </Grid>
            <KitchenCardItems
                items={items}
                modifiers={modifiers}
                isFullName={isFullName}
            />
            {StatusModifierComponent}
        </Card>
    );
};

interface CardProps extends Cprops {
    cardHeight?: number;
    cardWidth: number;
    cardMargin: number;
    key: number;
}
interface ParagraphProps {
    align: string;
}

const Card = styled(C)<CardProps>`
    ${flex('column')};
    box-sizing: border-box;
    width: ${(props): number => props.cardWidth - props.cardMargin}px;
    height: ${(props): number | undefined => props.cardHeight}px;
    padding: 10px;
    margin: 10px 0;
    flex: none;
    font-size: 0.9rem;
`;
const Grid = styled.div`
    display: grid;
    padding: 0 5px;
    grid-template-columns: repeat(3, 1fr);
`;

const Paragraph = styled(P)<ParagraphProps>`
    font-size: 0.75rem;
    text-align: ${(props): string => props.align};
    ${media(
        'tablet',
        `
    font-size: 0.65rem;
`,
    )}
`;
