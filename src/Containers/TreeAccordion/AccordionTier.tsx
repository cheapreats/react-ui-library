import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SVG_CONTAINER_WIDTH = 50;
const SVG_HORIZONTAL_START = 10;

export interface IAccordionTierProps extends React.HTMLAttributes<HTMLDivElement> {
    /* The header name for the tier */
    header: string;
    children: Array<React.ReactNode>
}

export const AccordionTier: React.FC<IAccordionTierProps> = ({
    header,
    children,
    ...props
}): React.ReactElement => {
    let totalChildrenHeight = 0;

    const [path, setPath] = useState(<svg />);


    const childrenRef = useRef<HTMLDivElement>(null);

    useEffect((): void => {
        const childrenContainer = childrenRef.current;
        if(childrenContainer){
            Array.from(childrenContainer.children).forEach((child) => {
                totalChildrenHeight += child.clientHeight;
            })
        }

        setPath(
            <svg width={`${SVG_CONTAINER_WIDTH}px`} height={`${totalChildrenHeight}px`} xmlns="http://www.w3.org/2000/svg">
                <path d={`M${SVG_HORIZONTAL_START} 0 V${totalChildrenHeight}`} stroke="black" fill="transparent"/>
            </svg>
        );
    })

    return(
        <Tier {...props}>
            <HeaderContainer>
                {header}
            </HeaderContainer>
            <BodyContainer>
                <SVGContainer>
                    {path}
                </SVGContainer>
                <ChildrenContainer ref={childrenRef}>
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
    ${() => `
        width: ${SVG_CONTAINER_WIDTH}px;
    `}
`;

const ChildrenContainer = styled.div`

`;