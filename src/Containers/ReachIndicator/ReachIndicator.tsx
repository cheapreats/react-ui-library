import React from 'react';
import styled from 'styled-components';

export interface ReachIndicatorProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Reach indicator display name ('people reached'/'post engagements') */
    indicatorName: string,
    /* Number of relevant engagements */
    indicatorNum: number,
    /* Goal number of engagements, defines what percent of the engagement bar is filled */
    indicatorGoal: number,
    /* Percent mark threshold that changes bar colour */
    indicatorPercentMark: number,
    /* EngagementBox must be greater than indicator minimum to render. Default value is 0 */
    indicatorMinimum: number,
}

export const ReachIndicator: React.FC<ReachIndicatorProps> = ({
    indicatorName,
    indicatorNum, 
    indicatorGoal,
    indicatorPercentMark,
    indicatorMinimum, 
    ...props
}): React.ReactElement => (
    <div>
        { !!(indicatorNum > indicatorMinimum) &&
            <EngagementBox {...props}>
                <EngagementHeader>{indicatorNum}</EngagementHeader>
                <EngagementTheme>{indicatorName}</EngagementTheme>
                <IndicatorProgressBar indicatorName={indicatorName} indicatorNum={indicatorNum} indicatorGoal={indicatorGoal} indicatorPercentMark={indicatorPercentMark} indicatorMinimum={indicatorMinimum} />
                <LoadingBar />
            </EngagementBox >
        }
    </div>
);
/**
 * Takes two numbers, divides num1 by num2 and turns it into a percentage out of 100
 * @param Num1 - Number of people who saw or interacted with the post
 * @param Num2 - Goal amount of people to see or interact with the post 
 */
const getPercentage = (num1: number, num2: number) => ((num1 / num2) * 100);

const EngagementBox = styled.div`
    width: 200px;
    border-style: solid;
    border-width: 1px;
    position: relative;
    height: fit-content;
    min-height: 100px;
    ${({ theme }): string => `
        background-color: ${theme.colors.background};
        border-color: ${theme.colors.border};
    `}
`
const IndicatorProgressBar = styled.div<ReachIndicatorProps>`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    bottom: 10px;
    max-width: 190px;
    left: 5px;
    ${({ theme, indicatorNum, indicatorGoal, indicatorPercentMark }): string => `
        font-family: ${theme.font.family};
        background-color: ${(getPercentage(indicatorNum, indicatorGoal) >= indicatorPercentMark)
        ? theme.colors.reachIndicatorColors.green
        : theme.colors.reachIndicatorColors.red
};
        width: ${getPercentage(indicatorNum, indicatorGoal)}%;
    `}    
`
const LoadingBar = styled.div`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    bottom: 10px;
    left: 5px;
    width: 190px;
    ${({ theme }): string => `
        background-color: ${theme.colors.border}; 
    `}
`
const EngagementHeader = styled.header`
    font-weight: bold;
    font-size: 20px;
    padding: 2px 5px 2px 5px; 
    ${({ theme }): string => `
        color: ${theme.colors.text}
    `}
`
const EngagementTheme = styled(EngagementHeader)`
    font-weight: normal; 
    padding-bottom:35px;
`
    
