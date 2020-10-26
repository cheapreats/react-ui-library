import React from 'react';
import styled from 'styled-components';

// STYLED COMPONENTS
const Wrapper = styled.div`
    text-align: center;
`;
const ModifierTools = styled.button`
    font-family: Quicksand;
    font-weight: bold;
    background: #fff;
    border: none;
    padding: 17px;
    display: inline-block;
    font-size: 18px;
    color: red;
    border-bottom: 3px solid red;
    outline: none;
`;
const Icon = styled.div`
    margin-right: 3px;
    display: inline-block;
    -moz-border-radius: 8px/8px;
    -webkit-border-radius: 8px 8px;
    border-radius: 8px/8px;
    border: solid 3px #f00;
    width: 8px;
    height: 8px;
`;
const CheckList = styled.button`
    font-family: Quicksand;
    font-weight: bold;
    background: #fff;
    border: none;
    padding: 17px;
    display: inline-block;
    font-size: 18px;
    color: red;
    border-bottom: 3px solid red;
    outline: none;
`;
// END OF STYLED COMPONENTS

// MODIFIER PROPS
export interface CheckHeaderProps {
    checkTitle: string;
    isGray: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export interface ModifierHeaderProps {
    modTitle: string;
    isGray: boolean;
    onClick: (e: React.MouseEvent) => void;
}
const onPage = {
    color: 'gray',
    borderBottom: 'none',
};
const IconGray = {
    border: 'solid 3px gray',
};
// END OF MODIFIER PROPS

export const CheckListHeader: React.FC<CheckHeaderProps> = ({
    checkTitle,
    isGray,
    onClick,
}): React.ReactElement => {
    if (isGray) {
        return (
            <CheckList onClick={onClick}>
                <Icon></Icon>
                {checkTitle}
            </CheckList>
        );
    } else {
        return (
            <CheckList onClick={onClick} style={onPage}>
                <Icon style={IconGray}></Icon>
                {checkTitle}
            </CheckList>
        );
    }
};

export const ModifierToolsHeader: React.FC<ModifierHeaderProps> = ({
    modTitle,
    isGray,
    onClick,
}): React.ReactElement => {
    if (isGray) {
        return (
            <ModifierTools onClick={onClick} style={onPage}>
                <Icon style={IconGray}></Icon>
                {modTitle}
            </ModifierTools>
        );
    } else {
        return (
            <ModifierTools onClick={onClick}>
                <Icon></Icon>
                {modTitle}
            </ModifierTools>
        );
    }
};
