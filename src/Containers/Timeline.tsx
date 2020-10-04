import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { flex } from '../Utils/Mixins';
import {
    Responsive,
    MainInterface,
    ResponsiveInterface,
} from '../Utils/BaseStyles';
import { SmallText } from '../Text';
import { MainTheme } from '../Themes';

interface TimelineDataItem {
    color: string;
    Icon: StyledIcon;
    text: string;
}

export interface TimelineProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    title: string;
    titleColor: string;
    subContentLeftTitle: string;
    subContentLeftAmount: string | number;
    subContentRightTitle: string;
    subContentRightAmount: string | number;
    figuresColor: string;
    textColor: string;
    separatorColor: string;
    separatorLength: string | number;
    timelineData: Array<TimelineDataItem>;
}

export const Timeline: React.FC<TimelineProps> = ({
    title,
    titleColor,
    subContentLeftTitle,
    subContentLeftAmount,
    subContentRightTitle,
    subContentRightAmount,
    figuresColor,
    textColor,
    separatorColor,
    separatorLength,
    timelineData,
    ...props
}): React.ReactElement => {
    const subContentLeftAmountLocale = `$${subContentLeftAmount.toLocaleString()}`;
    const subContentRightAmountLocale = `$${subContentRightAmount.toLocaleString()}`;

    const getTimelineItem = useCallback(
        (Item: TimelineDataItem, index: number) => (
            <TimelineItem key={`${index}_timeline`}>
                <TimelineItemLeft color={separatorColor} isFirst={index === 0}>
                    <Item.Icon style={{ width: '15px', color: Item.color }} />
                </TimelineItemLeft>
                <TimelineItemRight color={textColor}>
                    {Item.text}
                </TimelineItemRight>
            </TimelineItem>
        ),
        [separatorColor, textColor],
    );

    return (
        <TimelineBox {...props}>
            <SmallText size={MainTheme.font.size.h1} color={titleColor}>
                <strong>{title}</strong>
            </SmallText>
            <SubContentContainer>
                <SubContent>
                    <SmallText color={textColor}>
                        {subContentLeftTitle}
                    </SmallText>
                    <SmallText
                        size={MainTheme.font.size.h4}
                        color={figuresColor}
                    >
                        <strong>{subContentLeftAmountLocale}</strong>
                    </SmallText>
                </SubContent>
                <SubContent>
                    <SmallText color={textColor}>
                        {subContentRightTitle}
                    </SmallText>
                    <SmallText
                        size={MainTheme.font.size.h4}
                        color={figuresColor}
                    >
                        <strong>{subContentRightAmountLocale}</strong>
                    </SmallText>
                </SubContent>
            </SubContentContainer>
            <Separator width={separatorLength} color={separatorColor} />
            {timelineData.map((item, index) => getTimelineItem(item, index))}
        </TimelineBox>
    );
};

const TimelineItemRight = styled.div`
    ${({ theme, color }): string => `
font-size:${theme.font.size.small};
color:${color};
`}
    margin-left:15px;
`;

interface TimelineItemLeftProps extends React.HTMLAttributes<HTMLDivElement> {
    isFirst: boolean;
}

const TimelineItemLeft = styled.div<TimelineItemLeftProps>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    ${({ color }): string => `
color:${color};
`}
    background-color:currentColor;
    ${flex('center')}
    ${({ isFirst }): string =>
        isFirst
            ? ''
            : `
    &::before {
        content: '';
        width: 0px;
        height: 10px;
        border: 2px solid currentColor;
        position: relative;
        top: -30px;
        left: 7px;
    }
    `}
`;

const TimelineItem = styled.div`
    ${flex('row', 'flex-start', 'center')}
    margin-top:20px;
`;

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    width: string | number;
}

const Separator = styled.div<SeparatorProps>`
    ${({ width, color }): string => `
width:${width}px;
border:2px solid ${color};
`}
`;

const SubContent = styled.div`
    ${flex('column')}
    flex-basis:100%;
`;

const SubContentContainer = styled.div`
    ${flex()}
    margin-bottom:20px;
`;

const TimelineBox = styled.div`
    // Theme Stuff
    ${({ theme }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    
    `}
    // Base Styles
    ${Responsive}
    ${flex('column')}
    width:fit-content;
`;

export default Timeline;
