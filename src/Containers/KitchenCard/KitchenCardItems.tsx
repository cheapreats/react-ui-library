import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Heading as H, Paragraph } from '../../Text';
import { flex, media, scroll } from '../../Utils/Mixins';
import { ResponsiveInterface, MainInterface } from '../../Utils/BaseStyles';
import {
    OrderItem,
    ModifierChoiceInput,
    ModifierChoiceTypeEnum,
} from './constants';

export interface KitchenCardItemsProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    items: OrderItem[];
    isFullName: boolean;
}

export const KitchenCardItems: React.FC<KitchenCardItemsProps> = ({
    items,
    isFullName,
}): React.ReactElement => {
    const itemModifierRender = useCallback(
        (item: OrderItem) =>
            item.modifiers.map((modifier) =>
                modifier.choices.map(
                    (choice: ModifierChoiceInput): React.ReactElement => (
                        <Paragraph margin="5px 0 0 20px">
                            {`${
                                choice.choice_type ===
                                ModifierChoiceTypeEnum.DEFAULT
                                    ? ''
                                    : choice.choice_type
                            } ${choice.name}`}
                        </Paragraph>
                    ),
                ),
            ),
        [items],
    );

    return (
        <ItemsRow>
            {items.map(
                (item): React.ReactElement => (
                    <Item>
                        <Heading
                            type="h5"
                            bold
                            size="h5"
                            margin="0 0 0 5px"
                            isFullName={isFullName}
                        >
                            {item.name}
                        </Heading>
                        {itemModifierRender(item)}
                        <Bar />
                    </Item>
                ),
            )}
        </ItemsRow>
    );
};
interface HeadingProps {
    isFullName: boolean;
}
const ItemsRow = styled.div<MainInterface & ResponsiveInterface>`
    ${({ theme }): string => `
    border-top: 3px solid ${theme.colors.text}20;
    `};
    padding-bottom: 5px;
    margin: 10px 0 10px;
    overflow: auto;
    ${scroll}
    &::-webkit-scrollbar {
        background-color: transparent;
    }
`;
const Item = styled.div`
    ${flex('column')}
    width: 100%;
    margin-top: 10px;
    ${media(
        'tablet',
        `
        font-size:0.5rem;
    `,
    )}
`;
const Heading = styled(H)<HeadingProps>`
    display: block;
    ${(props): string | false =>
        !props.isFullName &&
        'overflow:hidden; ' +
            'white-space:nowrap; ' +
            'text-overflow:ellipsis'};
`;
const Bar = styled.div<MainInterface & ResponsiveInterface>`
    ${({ theme }): string => `
        background-color: ${theme.colors.text}20;
    `}
    margin: 10px auto 0;
    height: 3px;
    width: 100%;
`;
