import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AngleUp } from '@styled-icons/fa-solid/AngleUp';
import { Mixins } from '../../Utils';


const SVG_CONTAINER_WIDTH = 30;
const SVG_HORIZONTAL_START = 12;
const HALF_HEIGHT = 2;
const ANIMATION_TIME = 1000;
const HEIGHT_ANIMATION_DELAY = 250;
const ANIMATION_INDEX_SHIFT = 1;
const CENTER_ICON_ON_PATH = 2

export interface ITreeAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    /* The header name for the tier */
    header: string;
    /* The child elements making up the accordion's items */
    children: Array<React.ReactNode>;
    /* An Optional icon to display to the left of the header */
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    /* If true the number of items in the accordion will be shown in the header */
    displayItemCount?: boolean;
}

export const TreeAccordion: React.FC<ITreeAccordionProps> = ({
    header,
    children,
    icon,
    displayItemCount = false,
    ...props
}): React.ReactElement => {
    const [childHeights, setHeightArray] = useState([0])
    const [isExpanded, setIsExpanded] = useState(true);
    const [visibleHeight, setHeight] = useState(0);

    /**
     * Toggles the component's state between expanded and contracted
     */
    const toggleAccordian = (): void => {
        setIsExpanded(!isExpanded);
    }

    const childrenRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    /**
     * useEffect hook that triggers when the childRef is added to the Dom and updates the height array of child Elements for generating the SVG Paths
     */
    useEffect((): void => {
        const childrenContainer = childrenRef.current;
        const currentChildHeights: number[] = [];
        if(childrenContainer){
            Array.from(childrenContainer.children).forEach((child) => {
                currentChildHeights.push(child.clientHeight);
            })
        }
        setHeightArray(currentChildHeights);
    }, [childrenRef])

    /**
     * useEffect hook that triggers whenever the accordion's state is toggled between expanded and contracted. Upon doing so it updates the height of the main container to expand or contract the accordion
     */
    useEffect((): void => {
        const headerNode = headerRef.current;
        const childrenContianer = childrenRef.current;
        if(headerNode && childrenContianer){
            if(isExpanded){
                setHeight(headerNode.clientHeight + childrenContianer.clientHeight)
            } else {
                setHeight(headerNode.clientHeight)
            }
        }
    }, [isExpanded]);

    /**
     * Generates a sized SVG Element and its child Path Elements where each path terminates at the center of an accordion child's height
     * @returns an SVG Element containing it's child Path Elements
     */
    const generatePaths = (() => {
        const totalChildrenHeight = childHeights.reduce((totalSum, currentElementValue) => totalSum + currentElementValue, 0);
        let currentOffset = 0;
        const animationTimePerChild = ANIMATION_TIME / childHeights.length;
        return(
            <svg width={`${SVG_CONTAINER_WIDTH}px`} height={`${totalChildrenHeight}px`} xmlns="http://www.w3.org/2000/svg">
                {childHeights.map((childHeight, index) => {

                    const halfCurrentChildHeight = childHeight / HALF_HEIGHT;
                    const arcEndHeight = currentOffset + halfCurrentChildHeight;
                    const arcStartHeight = arcEndHeight - (SVG_CONTAINER_WIDTH - SVG_HORIZONTAL_START);
                    const SVGPath = `M${SVG_HORIZONTAL_START} 0 V${arcStartHeight} Q${SVG_HORIZONTAL_START} ${arcEndHeight} ${SVG_CONTAINER_WIDTH} ${arcEndHeight}`
                    currentOffset += childHeight;

                    return( <Path d={SVGPath} pathLength={1} isExpanded={isExpanded} animationTime={animationTimePerChild * (index + ANIMATION_INDEX_SHIFT)}/>);
                })}
            </svg>
        )
    });

    return(
        <Tier {...props} height={visibleHeight}>
            <HeaderContainer ref={headerRef} onClick={toggleAccordian}>
                {icon && <Icon as={icon} />}
                <HeaderText>{header}</HeaderText>
                <ArrowContainer>
                    {displayItemCount && <Text>
                        {children.length}
                    </Text>}
                    <AngleIcon isExpanded={isExpanded}/>
                </ArrowContainer>
            </HeaderContainer>
            <BodyContainer>
                <SVGContainer>
                    {generatePaths()}
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
        ${Mixins.transition(['height'], (ANIMATION_TIME - HEIGHT_ANIMATION_DELAY))}
    `)}
`;

const HeaderContainer = styled.div`
    display: inline-flex;
    align-content: center;
    width: 100%;
    :hover{
        cursor: pointer
    }
`;

const HeaderText = styled.div`
    ${({ theme }) => `
        font-size: ${theme.font.size.h5};
    `}
    align-self: center;
    flex-grow: 1
`;

const BodyContainer = styled.div`
    display: flex;
    width: 100%;
    padding-top: ${SVG_CONTAINER_WIDTH - SVG_HORIZONTAL_START};
`;

const SVGContainer = styled.div`
    width: ${SVG_CONTAINER_WIDTH}px;
`;

const ChildrenContainer = styled.div`
    margin-left: .5rem;
`;

interface IPathProps{
    isExpanded: boolean;
    animationTime: number
}

const Path = styled.path<IPathProps>`

    stroke: black;
    stroke-width: 2px;
    stroke-dasharray: 1;
    ${({isExpanded, animationTime}) => `
        stroke-dashoffset: ${isExpanded ? 0 : 1};
        ${Mixins.transition(['stroke-dashoffset'], (isExpanded ? animationTime : ANIMATION_TIME - animationTime))}
    `}
    fill: transparent;
`;

const Icon = styled.svg`
    width: ${SVG_HORIZONTAL_START * CENTER_ICON_ON_PATH}px;
    height: ${SVG_HORIZONTAL_START * CENTER_ICON_ON_PATH}px;
    margin-right: .5rem;
`;

interface IAngleIconProps{
    isExpanded: boolean;
}

const AngleIcon = styled(AngleUp)<IAngleIconProps>`
    ${Mixins.transition(['transform'])}
    transform: rotate(${({ isExpanded }): number => (isExpanded ? 180 : 90)}deg);
    width: 12px;
    margin-left: .3rem;
`;

const ArrowContainer = styled.div`
    display: inline-flex;
    allign-content: center;
    margin-left: .5rem;
    verticle-align: center;
`

const Text = styled.div`
    ${({ theme }) => `  
        font-size: ${theme.font.size.small};
        background-color: ${theme.colors.border};
        border-radius: 4px;
    `}
    padding: 2px 4px;
    align-self: center;
`