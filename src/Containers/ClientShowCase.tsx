import React from 'react';
import styled from 'styled-components';
import { Mixins } from '../Utils';

const IMAGE_HEIGHTS: object = {
    small: 15,
    medium: 30,
    large: 45,
    extraLarge: 60,
};

export interface ShowCaseProps extends React.HTMLAttributes<HTMLDivElement> {
    imgData: string[];
    handleImageListClick?: (
        event: React.MouseEvent<Element, MouseEvent>,
    ) => void;
    button?: React.ReactNode;
    imgHeightEnum: string;
}

export interface ClientListProps {
    imgData: string[];
    imgHeight: number;
}

export interface ClientProps {
    src: string;
    imgHeight: number;
}

export interface ImgProps {
    imgHeight: number;
}

const ClientImg: React.FC<ClientProps> = ({ src, imgHeight }) => {
    return (
        <IconListItem key={src}>
            <IconImg imgHeight={imgHeight} src={src} />
        </IconListItem>
    );
};

const ClientList: React.FC<ClientListProps> = ({ imgData, imgHeight }) => {
    return (
        <ImageList>
            {imgData.map((imgURL: string) => (
                <ClientImg imgHeight={imgHeight} src={imgURL} />
            ))}
        </ImageList>
    );
};

export const ClientShowCase: React.FC<ShowCaseProps> = ({
    imgData,
    handleImageListClick,
    button,
    imgHeightEnum,
    ...props
}): React.ReactElement => {
    return (
        <ImageListDiv onClick={handleImageListClick} {...props}>
            <ClientList
                imgData={imgData}
                imgHeight={IMAGE_HEIGHTS[imgHeightEnum]}
            />
            <ButtonDiv>{button}</ButtonDiv>
        </ImageListDiv>
    );
};

const ImageListDiv = styled.div``;

const ImageList = styled.ul`
    list-style-type: none;
    text-align: center;
    ${ImageListDiv}:hover & {
        ${Mixins.transition(['filter'], '1s')}
        filter: blur(7px);
    }
    padding: 0;
`;

const IconListItem = styled.li`
    display: inline-block;
    padding: 2%;
    vertical-align: middle;
    width: auto;
`;

const ButtonDiv = styled.div`
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
