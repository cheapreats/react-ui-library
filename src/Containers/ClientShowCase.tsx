import React from 'react';
import styled from 'styled-components';
import { Button } from '../Inputs/Button';

const IMAGE_HEIGHT = 30;

export interface ClientProps extends React.HTMLAttributes<HTMLDivElement> {
    imgData: string[];
    handleClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    buttonText: string;
    animationTime: number;
}

export interface ImageListProps {
    animationTime: number;
}

export const ClientShowCase: React.FC<ClientProps> = ({
    imgData,
    handleClick,
    buttonText = 'SEE OUR CUSTOMERS',
    animationTime = 1.5,
    ...props
}): React.ReactElement => {
    return (
        <ImageListDiv onClick={handleClick} {...props}>
            <ImageList animationTime={animationTime}>
                {imgData.map((imgURL: string) => (
                    <IconListItem key={imgURL}>
                        <IconImg src={imgURL} />
                    </IconListItem>
                ))}
            </ImageList>
            <ButtonDiv>
                <MyButton primary>{buttonText}</MyButton>
            </ButtonDiv>
        </ImageListDiv>
    );
};

const ImageListDiv = styled.div`
    width: 100%;
    height: auto;
`;

const ImageList = styled.ul<ImageListProps>`
    display: inline-block;
    list-style-type: none;
    text-align: center;
    ${ImageListDiv}:hover & {
        transition: filter ${({ animationTime }): number => animationTime}s;
        filter: blur(7px);
    }
    padding: 0;
    width: 100%;
    height: auto;
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
`;

const IconImg = styled.img`
    height: ${IMAGE_HEIGHT}px;
    max-width: 100%;
`;

const MyButton = styled(Button)`
    display: none;
    ${ImageListDiv}:hover & {
        display: flex;
    }
    height: auto;
`;
