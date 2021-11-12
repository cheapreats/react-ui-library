import React from 'react';
import styled from 'styled-components';

export interface IAccordionTierProps extends React.HTMLAttributes<HTMLDivElement> {
    /* The header name for the tier */
    header: string;
}

export const AccordionTier: React.FC<IAccordionTierProps> = ({
    header,
    children,
    ...props
}): React.ReactElement => {
    const value = 0;

    return(
        <Tier {...props}>
            <HeaderContainer>
                {header}
            </HeaderContainer>
            <BodyContainer>
                <SVGContainer>
                    stuff
                </SVGContainer>
                <ChildrenContainer>
                    {children}
                </ChildrenContainer>
            </BodyContainer>
        </Tier>
    )
}

const Tier = styled.div`

`;

const HeaderContainer = styled.div`

`;

const BodyContainer = styled.div`
    display: flex;

`;

const SVGContainer = styled.div`

`;

const ChildrenContainer = styled.div`

`;