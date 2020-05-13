import React, { Component } from 'react';
import styled from 'styled-components';
import { Mixins } from '../Utils';
import { Button } from '../Inputs/Button';

const IMAGE_HEIGHT = 30;

export interface ClientProps extends React.HTMLAttributes<HTMLDivElement> {
    imgData: string[];
    handleImageListClick: (
        event: React.MouseEvent<Element, MouseEvent>,
    ) => void;
    button: React.ReactNode;
}

export const ClientShowCase: React.FC<ClientProps> = ({
    imgData,
    handleImageListClick,
    button,
    ...props
}): React.ReactElement => {
    return (
        <ImageListDiv onClick={handleImageListClick} {...props}>
            <ImageList>
                {imgData.map((imgURL: string) => (
                    <IconListItem key={imgURL}>
                        <IconImg src={imgURL} />
                    </IconListItem>
                ))}
                {console.log('wow')}
            </ImageList>
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
    .button {
        filter: blur(7px);
    }
`;

const IconImg = styled.img`
    height: ${IMAGE_HEIGHT}px;
    max-width: 100%;
`;
/*
const MyButton = styled(Button)`
    display: none;
    ${ImageListDiv}:hover & {
        display: flex;
    }
    height: auto;
`;*/
