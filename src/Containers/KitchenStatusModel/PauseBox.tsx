import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

export interface PauseBoxProps {
    /* minutes until time runs out */ 
    minsRemaining: number,
}

export const PauseBox: React.FC<PauseBoxProps> = ({
    minsRemaining,
    ...props
}): React.ReactElement => (

    <PauseBoxWrapper {...props}>
        <PauseContainer
            onClick={action(String(minsRemaining))}
        >
            <PauseBoxHeader>
                Pause For
            </PauseBoxHeader>
            <PauseBoxBody>
                {minsRemaining} mins
            </PauseBoxBody>
        </PauseContainer>
    </PauseBoxWrapper>
);

const PauseBoxWrapper = styled.div`
    margin: 5px 5px;
    display: inline-block;
`

const PauseBoxHeader = styled.header`
    text-align: center;
    font-size: 12px;
`;

const PauseBoxBody = styled.div`
    font-weight: bold;
    font-size: 18px;
    text-align: center;
`

const PauseContainer = styled.button`
    padding: 10px 0px;
    width: 120px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 5px 5px 0px rgb(0, 0, 0, 0.5);
    cursor: pointer;

    &:focus{
    background-color: rgba(0,0,0,0.1);
    border-style: solid;
    border-color: rgba(80, 130, 255);
    cursor: default;
    }
    
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.text}};
    background-color:  ${theme.colors.background};
    `}
`;