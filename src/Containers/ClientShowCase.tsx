import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Inputs/Button';


export interface cardProps {
    imgData: string[]
    /*onHover: Function*/
    handleClick: (event: React.MouseEvent<Element, MouseEvent>) => void
}

const componentHeight = '90px'

export const ClientShowCase:React.FC<cardProps> = ({
    imgData,
    handleClick,
}):React.ReactElement => {
    const [isHovering, setHovering] = useState(false);


const NormalItem = styled.li`
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

const BlurredItem = styled.li`
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
    -webkit-filter: blur(10px);
`;

const List = styled.ul`
    list-style-type: none;
    text-align: center;
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

const ClientImg = styled.img`
`;
const ComponentDiv = styled.div`
    height: ${componentHeight};
    width: 100%;
`;

    const NormalImages = imgData.map((imgURL: string) =>
    <NormalItem>
        <ClientImg src={imgURL} />
    </NormalItem>
    );

    const BlurredImages = imgData.map((imgURL: string) =>
    <BlurredItem>
        <ClientImg src={imgURL} />
    </BlurredItem>
    );
    


    return (
        <ComponentDiv
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}>
            {
            isHovering
            ?
                <div>
                    <List> {BlurredImages} </List>
                    <ButtonDiv><Button primary>SEE OUR CUSTOMERS</Button></ButtonDiv>
                </div>
            :
            <List> {NormalImages} </List>}
            </ComponentDiv>
    );
};

