import React from 'react';
import styled from 'styled-components';
import { Button } from '../Inputs/Button';

const COMPONENT_HEIGHT = '90px'

export interface ClientProps {
    imgData: string[]
    handleClick: (event: React.MouseEvent<Element, MouseEvent>) => void
    buttonText: string
}

 

export const ClientShowCase:React.FC<ClientProps> = ({
    imgData,
    handleClick,
    buttonText
}):React.ReactElement => {



    const ImageList = imgData.map((imgURL: string) =>
    <IconListItem key={imgURL}>
        <IconImg src={imgURL} />
    </IconListItem>
    );



    return (
        <ComponentDiv
        onClick={handleClick}>
            <List>{ImageList}</List>
            <ButtonDiv><MyButton primary>{buttonText}</MyButton></ButtonDiv>
        </ComponentDiv>
    );
};

const ComponentDiv = styled.div`
    height: ${COMPONENT_HEIGHT};
    width: 100%;
`;

const IconListItem = styled.li`
    display: inline-block;
    padding: 2%;
    vertical-align:middle;
    @media (min-width: 550px) {
        width: 15%
    }
    @media (max-width: 550px) {
        width: 20%
    }
    @media (max-width: 350px) {
        width: 30%
    }
`;

const List = styled.ul`
    list-style-type: none;
    text-align: center;
    ${ComponentDiv}:hover & {
        filter: blur(7px);
    };
    padding: 0;
    height: ${COMPONENT_HEIGHT};
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
    height: auto;
    max-width: 100%;
`;

const MyButton = styled(Button)`
    display: none;
    ${ComponentDiv}:hover & {
        display: block;
    };
    height: auto;
`;