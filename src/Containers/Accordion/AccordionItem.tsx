import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from '../../Text';
import { Mixins } from '../../Utils';

export interface AccordionItemProps {
    header: string;
    headerType: string;
    mainText: string;
    hoveredStyle: Function;
    activeStyle: Function;
}

export interface TextDivProps {
    isActive: boolean;
}

export interface SectionDivProps {
    isActive: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    header,
    mainText,
    hoveredStyle,
    activeStyle,
    headerType,
    children,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false);
    const toggleIsActive = () => {
        setIsActive(!isActive);
    };
    return (
        <SectionDiv {...props} isActive={isActive}>
            <HeaderDiv onClick={toggleIsActive}>
                <Heading type={headerType}>{header}</Heading>
            </HeaderDiv>
            <TextDiv isActive={isActive}>
                <MainText>{mainText}</MainText>
                {children}
            </TextDiv>
        </SectionDiv>
    );
};

const SectionDiv = styled.div<SectionDivProps>``;

const HeaderDiv = styled.div`
    user-select: none;
    padding: 1%;
    cursor: pointer;
    :hover {
        ${Mixins.transition(['background-color'], '1s')};
        background-color: lightgrey;
    }
`;

const TextDiv = styled.div<TextDivProps>`
    ${Mixins.transition(['display'], '5s')};
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    padding: 1%;
`;

const MainText = styled.p`
    margin: 0;
`;
