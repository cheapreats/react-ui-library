import React from 'react';
import styled from 'styled-components';
import { DashLg } from '@styled-icons/bootstrap/DashLg';

export enum statusEnum {
    /*Possible status choices*/
    Normal = 0,
    Busy = 1,
    Pause = 2,
}

export type StatusButtonElements= {status: statusEnum, color: string, header: string, body: string};

export interface StatusButtonProps {
    /* Holds information about status buttons (color, header and body) */
    statusBox: StatusButtonElements;
    /* Index of the current box, corresponds to status when mapped */
    index: number,
    /* Action that is sent to story */
    onClick: (currentStatus: statusEnum) => void;
}

export const StatusButton: React.FC<StatusButtonProps> = ({
    statusBox,
    index,
    onClick,
    ...props
}): React.ReactElement => {
    
    const onStatusClick = (currentStatus: statusEnum) => {
        return function () {
            onClick(currentStatus);
        }
    }

    return (
        <StatusButtonDiv onClick={onStatusClick(index)}>
            <StatusIcon color={statusBox.color}></StatusIcon>
            <StatusHeader>{statusBox.header}</StatusHeader>
            <StatusBody>{statusBox.body}</StatusBody>
        </StatusButtonDiv>
    )
};

interface StyledButtonDivProps {
    status?: statusEnum;
}

const StatusButtonDiv = styled.button<StyledButtonDivProps>`
    width: 165px;
    margin: 2px;
    height: 100px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 5px 5px 0px rgb(0, 0, 0, 0.5);
    cursor: pointer;

    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.text}};
    background-color:  ${theme.colors.background};
    `}
`

interface StatusIconProps {
    color: string;
}

const StatusIcon = styled(DashLg)<StatusIconProps>`
    height: 80px;
    transform: rotate(90deg);
    float: left;
    margin: 0px -20px 0px -20px;

    ${({color}):string => `
        color: ${color};
    `}
`

const StatusHeader = styled.header`
    font-weight: bold;
    font-size: 16px;
    margin-top: 5%;
    text-align: left;
`

const StatusBody = styled.div`
    margin-top: 10%;
    text-align: left;
`