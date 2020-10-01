import React from 'react';
import styled from 'styled-components';
import { flex } from '../Utils/Mixins';
import {
    Responsive,
    MainInterface,
    ResponsiveInterface,
} from '../Utils/BaseStyles';
import '../../iconFonts/css/fontello.css';

export interface TimelineProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    title: string;
    colorTitle: string;
    subContentLeftTitle: string;
    subContentLeftAmount: string | number;
    subContentRightTitle: string;
    subContentRightAmount: string | number;
    colorFigures: string;
    colorText: string;
    colorOther: string;
    lengthSeparator: string | number;
    data: Array<any>;
}

export const Timeline: React.FC<TimelineProps> = ({
    title,
    colorTitle,
    subContentLeftTitle,
    subContentLeftAmount,
    subContentRightTitle,
    subContentRightAmount,
    colorFigures,
    colorText,
    colorOther,
    lengthSeparator,
    data,
    ...props
}): React.ReactElement => {
    const subContentLeftAmountLocale = `$${subContentLeftAmount.toLocaleString()}`;
    const subContentRightAmountLocale = `$${subContentRightAmount.toLocaleString()}`;

    const getTimelineItem = (item: any, index: number) => (
        <TimelineItem key={`${index}_timeline`}>
            <TimelineItemLeft color={colorOther} isFirst={index === 0}>
                <I color={item.color} className={item.font} />
            </TimelineItemLeft>
            <TimelineItemRight color={colorText}>{item.text}</TimelineItemRight>
        </TimelineItem>
    );
    return (
        <TimelineBox {...props}>
            <Title color={colorTitle}>
                <strong>{title}</strong>
            </Title>
            <SubContentContainer>
                <SubContent>
                    <SmallTitle color={colorText}>
                        {subContentLeftTitle}
                    </SmallTitle>
                    <BigContent color={colorFigures}>
                        <strong>{subContentLeftAmountLocale}</strong>
                    </BigContent>
                </SubContent>
                <SubContent>
                    <SmallTitle color={colorText}>
                        {subContentRightTitle}
                    </SmallTitle>
                    <BigContent color={colorFigures}>
                        <strong>{subContentRightAmountLocale}</strong>
                    </BigContent>
                </SubContent>
            </SubContentContainer>
            <Separator width={lengthSeparator} color={colorOther} />
            {data.map((item, index) => getTimelineItem(item, index))}
        </TimelineBox>
    );
};

const I = styled.i`
    ${({ color }): string => `
color:${color};
`}
`;

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
        left: 11px;
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

const BigContent = styled.div`
    ${({ theme, color }): string => `
font-size:${theme.font.size.h4};
color:${color};
`}
`;

const SmallTitle = styled.div`
    ${({ theme, color }): string => `
font-size:${theme.font.size.small};
color:${color};
`}
    margin-bottom:5px;
`;

const SubContent = styled.div`
    ${flex('column')}
    flex-basis:100%;
`;

const SubContentContainer = styled.div`
    ${flex()}
    margin-bottom:20px;
`;

const Title = styled.div`
    ${({ theme, color }): string => `
font-size:${theme.font.size.h1};
color:${color};
`}
    margin-bottom:10px;
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
