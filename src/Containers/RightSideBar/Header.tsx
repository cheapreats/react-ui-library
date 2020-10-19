import React  from 'react';
import styled from 'styled-components';

// STYLED COMPONENTS
const Wrapper = styled.div`
    text-align: center;
`;
const ModifierTools = styled.h1`
    padding: 17px;
    display: inline-block;
    font-size: 18px;
    color: red;
    border-bottom: 3px solid red;
`;
const Icon = styled.div`    
    display: inline-block;
    -moz-border-radius: 10px/10px;
    -webkit-border-radius: 10px 10px;
    border-radius: 10px/10px;
    border: solid 3px #f00;
    width: 10px;
    height: 10px;
`;
const CheckList = styled.h1`
    padding: 17px;
    display: inline-block;
    font-size: 18px;
    color: red;
    border-bottom: 3px solid red;
`;
// END OF STYLED COMPONENTS

// MODIFIER PROPS
export interface HeaderProps {
    modTitle: string,
    checkTitle: string,
    isGray: boolean,
};
const onPage = {
    color: 'gray',
    borderBottom: 'none'
}
const IconGray = {
    border: 'solid 3px gray',
}
// END OF MODIFIER PROPS

export const Header: React.FC<HeaderProps> = ({
    modTitle,
    checkTitle,
    isGray,
}): React.ReactElement => {
    if (isGray) {
        return (
            <Wrapper>
                <CheckList><Icon></Icon>{ checkTitle }</CheckList>
                <ModifierTools style={onPage} ><Icon style={IconGray}></Icon>{ modTitle }</ModifierTools>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <CheckList style={onPage}><Icon style={IconGray}></Icon>{ checkTitle }</CheckList>
                <ModifierTools><Icon></Icon>{ modTitle }</ModifierTools>
            </Wrapper>
        )
    }
};

