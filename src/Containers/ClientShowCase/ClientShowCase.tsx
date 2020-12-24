import React from 'react';
import styled from 'styled-components';
import { ClientImg } from './ClientShowCaseItem';
import { Mixins } from '../../Utils';

enum IMAGE_HEIGHTS {
    small = 15,
    medium = 30,
    large = 45,
    extraLarge = 60,
}

export interface ShowCaseProps extends React.HTMLAttributes<HTMLDivElement> {
    imgData: string[];
    handleImageListClick?: (
        event: React.MouseEvent<Element, MouseEvent>,
    ) => void;
    onHoverComponent?: React.ReactNode;
    imgHeightEnum?: IMAGE_HEIGHTS;
    blurOnHover?: boolean;
}

interface ClientListProps {
    imgData: string[];
    imgHeight: number;
    blurOnHover: boolean;
}

interface ImgListProps {
    blurOnHover: boolean;
}

export const ClientShowCase: React.FC<ShowCaseProps> = ({
    imgData,
    handleImageListClick,
    onHoverComponent,
    imgHeightEnum = 'medium',
    blurOnHover = true,
    ...props
}): React.ReactElement => (
    <ImageListDiv onClick={handleImageListClick} {...props}>
        <ClientList
            imgData={imgData}
            imgHeight={IMAGE_HEIGHTS[imgHeightEnum]}
            blurOnHover={blurOnHover}
        />
        <OnHoverComponentDiv>{onHoverComponent}</OnHoverComponentDiv>
    </ImageListDiv>
);

const ClientList: React.FC<ClientListProps> = ({
    imgData,
    imgHeight,
    blurOnHover,
}): React.ReactElement => (
    <ImageList blurOnHover={blurOnHover}>
        {imgData.map(
            (imgURL: string): React.ReactElement => (
                <ClientImg imgHeight={imgHeight} src={imgURL} />
            ),
        )}
    </ImageList>
);

const ImageListDiv = styled.div``;

const ImageList = styled.ul<ImgListProps>`
    list-style-type: none;
    text-align: center;
    ${({ blurOnHover }): string =>
        blurOnHover
            ? `${ImageListDiv}:hover & {
                ${Mixins.transition(['filter'], '1s')}
                filter: blur(7px);
            }`
            : ''}
    padding: 0;
`;

const OnHoverComponentDiv = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    & {
        display: none;
    }
    ${ImageListDiv}:hover & {
        display: flex;
    }
`;
