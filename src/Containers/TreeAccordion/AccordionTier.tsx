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
    const [isActive, setIsActive] = useState(true);
    const [visibleHeight, setHeight] = useState(0);

    const toggleAccordian = (): void => {
        setIsActive(!isActive);
    }

    const childrenRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect((): void => {
        console.log(childrenRef);
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
    }, [childrenRef])

    useEffect((): void => {
        const headerNode = headerRef.current;
        const childrenContianer = childrenRef.current;
        if(headerNode && childrenContianer){
            if(isActive){
                setHeight(headerNode.clientHeight + childrenContianer.clientHeight)
            } else {
                setHeight(headerNode.clientHeight)
            }
        }
    }, [isActive]);

    return(
        <Tier {...props} height={visibleHeight}>
            <HeaderContainer ref={headerRef} onClick={toggleAccordian}>
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

interface ITierProps{
    height: number;
}

const Tier = styled.div<ITierProps>`
    overflow: hidden;
    ${(({ height }) => `
        height: ${height}px;
    `)}
`;

const HeaderContainer = styled.div`
    :hover{
        cursor: pointer
    }
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