import React from 'react';
import styled from 'styled-components';
import { Mixins } from '../Utils';

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
    imgHeightEnum?: string;
    blurOnHover?: boolean;
}

interface ClientListProps {
    imgData: string[];
    imgHeight: number;
    blurOnHover: boolean;
}

interface ClientProps {
    src: string;
    imgHeight: number;
}

interface ImgProps {
    imgHeight: number;
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
}): React.ReactElement => {
    return (
        <ImageListDiv onClick={handleImageListClick} {...props}>
            <ClientList
                imgData={imgData}
                imgHeight={IMAGE_HEIGHTS[imgHeightEnum]}
                blurOnHover={blurOnHover}
            />
            <OnHoverComponentDiv>{onHoverComponent}</OnHoverComponentDiv>
        </ImageListDiv>
    );
};

const ClientImg: React.FC<ClientProps> = ({ src, imgHeight }) => {
    return (
        <IconListItem key={src}>
            <IconImg imgHeight={imgHeight} src={src} />
        </IconListItem>
    );
};

const ClientList: React.FC<ClientListProps> = ({
    imgData,
    imgHeight,
    blurOnHover,
}) => {
    return (
        <ImageList blurOnHover={blurOnHover}>
            {imgData.map((imgURL: string) => (
                <ClientImg imgHeight={imgHeight} src={imgURL} />
            ))}
        </ImageList>
    );
};

const ImageListDiv = styled.div``;

const ImageList = styled.ul<ImgListProps>`
    list-style-type: none;
    text-align: center;
    ${({ blurOnHover }) =>
        blurOnHover
            ? `${ImageListDiv}:hover & {
                ${Mixins.transition(['filter'], '1s')}
                filter: blur(7px);
            }`
            : ''}
    padding: 0;
`;

const IconListItem = styled.li`
    display: inline-block;
    padding: 2%;
    vertical-align: middle;
    width: auto;
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

const IconImg = styled.img<ImgProps>`
    height: ${({ imgHeight }): number => imgHeight}px;
    max-width: 100%;
`;
