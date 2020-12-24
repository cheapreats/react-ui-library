import React from 'react';
import { Times } from '@styled-icons/fa-solid/Times';
import styled from 'styled-components';
import { flex, position, transition, scroll } from '@Utils/Mixins';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';

export interface ImageCarouselProps
    extends MainInterface,
        ResponsiveInterface,
        Omit<React.HTMLAttributes<HTMLUListElement>, 'onClick'>,
        ImplicitPropsInterface {
    imageData: string[];
    pointer?: boolean;
    onClick?: Function;
    hoverIcon?: React.ForwardRefExoticComponent<
        React.RefAttributes<SVGSVGElement>
    >;
    hoverOverlay?: boolean;
    hoverText?: string;
    altText: string;
    width?: number;
    height?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
    imageData,
    onClick = (): void => undefined,
    pointer = true,
    hoverIcon = Times,
    hoverOverlay = true,
    hoverText = 'Delete',
    altText,
    width = 150,
    height = 75,
    ...props
}): React.ReactElement => (
    <Items {...props}>
        {imageData.map(
            (image: string): React.ReactElement => (
                <Item
                    key={image}
                    onClick={(): void => onClick(image)}
                    cursor={pointer}
                >
                    {hoverOverlay && (
                        <Overlay>
                            <Icon as={hoverIcon} />
                            {hoverText}
                        </Overlay>
                    )}
                    <img
                        width={width}
                        height={height}
                        alt={altText}
                        src={image}
                    />
                </Item>
            ),
        )}
    </Items>
);

interface StyledItemProps {
    cursor: boolean;
}

const Items = styled.ul`
    ${flex()}
    ${scroll}
    overflow: auto;
    list-style-type: none;
    padding: 0;
    margin: 15px 0 0;
`;

const Item = styled.li<StyledItemProps>`
    ${transition(['background-color'])}
    ${flex('row', 'center')}
    position: relative;
    border-radius: 8px;
    margin: 0 7px 7px 0;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
    cursor: ${({ cursor }): {} => (cursor ? 'pointer' : '')};
    overflow: hidden;
`;

const Overlay = styled.div`
    ${flex('row', 'flex-start', 'center')}
    ${position('absolute')}
    ${transition(['opacity'])}
    background-color: rgba(0,0,0,0.5);
    box-sizing: border-box;
    color: white;
    padding: 10px 15px;
    opacity: 0;
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.svg`
    width: 16px;
    height: 16px;
    margin-right: 3px;
`;
