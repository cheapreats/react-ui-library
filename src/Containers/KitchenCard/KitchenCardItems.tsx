import React from 'react';
import styled from 'styled-components';
import { Heading as H, Paragraph } from '../../Text';
import { flex, media, scroll } from '../../Utils/Mixins';
import { ResponsiveInterface, MainInterface } from '../../Utils/BaseStyles';

interface Item {
    name: string;
}

export interface KitchenCardItemsProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    items: Item[];
    isFullName: boolean;
    modifiers: [][];
}

export const KitchenCardItems: React.FC<KitchenCardItemsProps> = ({
    items,
    isFullName,
    modifiers,
}): React.ReactElement => {
    return (
        <ItemsRow>
            {items.map(
                (item, index): React.ReactElement => (
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
                        {modifiers[index].map(
                            (fil): React.ReactElement => (
                                <Paragraph margin="0 0 0 20px">{fil}</Paragraph>
                            ),
                        )}
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
