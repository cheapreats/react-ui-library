import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SVG_CONTAINER_WIDTH = 30;
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
        const childHeights: number[] = [];
        if(childrenContainer){
            Array.from(childrenContainer.children).forEach((child) => {
                totalChildrenHeight += child.clientHeight;
                childHeights.push(child.clientHeight);
            })
        }

        const horizontalDistance = SVG_CONTAINER_WIDTH - SVG_HORIZONTAL_START;
        let currentOffset = 0;

        setPath(
            <svg width={`${SVG_CONTAINER_WIDTH}px`} height={`${totalChildrenHeight}px`} xmlns="http://www.w3.org/2000/svg">
                <path d={`M${SVG_HORIZONTAL_START} 0 V${totalChildrenHeight - (childHeights[childHeights.length - 1] / 2)}`} stroke="black" fill="transparent"/>
                {childHeights.map((childHeight) => {
                    currentOffset += childHeight / 2;
                    const SVGPath = `M${SVG_HORIZONTAL_START} ${currentOffset} H${horizontalDistance}`
                    currentOffset += childHeight / 2;

                    return(<path d={SVGPath} stroke="black" fill="transparent"/>);
                })}
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