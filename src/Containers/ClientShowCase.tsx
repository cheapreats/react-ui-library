import React from 'react';
import styled from 'styled-components';
import { Button } from '../Inputs/Button';

const IMAGE_HEIGHT = 30;

export interface ClientProps {
    imgData: string[]
    handleClick: (event: React.MouseEvent<Element, MouseEvent>) => void
    buttonText: string
    animationTime: number
}

 

export const ClientShowCase:React.FC<ClientProps> = ({
    imgData,
    handleClick,
    buttonText,
    animationTime
}):React.ReactElement => {

    return (
        <ComponentDiv
        onClick={handleClick}>
            <List animationTime={animationTime}>
                {imgData.map((imgURL: string) => (
                    <IconListItem key={imgURL}>
                        <IconImg src={imgURL} />
                    </IconListItem>
                ))}
            </List>
            <ButtonDiv>
                <MyButton primary>{buttonText}</MyButton>
            </ButtonDiv>
        </ComponentDiv>
    );
};

const ComponentDiv = styled.div`
    width: 100%;
    height: auto;
`;

const IconListItem = styled.li`
    display: inline-block;
    padding: 2%;
    vertical-align: middle;
    width: auto;
`;

const List = styled.ul`
    display: inline-block;
    list-style-type: none;
    text-align: center;
    ${ComponentDiv}:hover & {
        transition: filter ${props => props.animationTime}s;
        filter: blur(7px);
    };
    padding: 0;
    width: 100%;
    height: auto;
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
    ${ComponentDiv}:hover & {
        display: flex;
    };
    height: auto;
`;