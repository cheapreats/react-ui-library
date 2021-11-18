import React from 'react';
import styled from 'styled-components';
import { } from 'Themes';

export interface ReachIndicatorProps 
extends React.HTMLAttributes<HTMLDivElement> {
    engageNum: number,
    engageGoal: number,
    reachNum: number,
    reachGoal: number,
    percentMark: number,
}

export const ReachIndicator: React.FC<ReachIndicatorProps>
= ({
    engageNum,
    engageGoal,
    reachNum,
    reachGoal,
    percentMark,
    ...props
}): React.ReactElement => (
    <ReachIndicatorFlex>
        <EngagementBox {...props}>
            <EngagementHeader>{engageNum}</EngagementHeader>
            <EngagementTheme>Post Engagements</EngagementTheme>
            <EngagementProgressBar engageNum={engageNum} engageGoal={engageGoal} reachNum={reachNum} reachGoal={reachGoal} percentMark={percentMark}/>
            <LoadingBar />
        </EngagementBox>

        <EngagementBox {...props}>
            <EngagementHeader>{reachNum}</EngagementHeader>
            <EngagementTheme>People Reached</EngagementTheme>
            <ReachedProgressBar engageNum={engageNum} engageGoal={engageGoal} reachNum={reachNum} reachGoal={reachGoal} percentMark={percentMark}/>
            <LoadingBar /> 
        </EngagementBox>
    </ReachIndicatorFlex> 
);

function getEngagementAmount(engageNum: number, engageGoal: number) {
    return ((engageNum / engageGoal) * 100) 
}

function getReachAmount(reachNum: number, reachGoal: number) {
    return ((reachNum / reachGoal) * 100)
}

// {theme.colors.reachIndicatorColors.red}
// {theme.colors.reachIndicatorColors.yellow}
// {theme.colors.reachIndicatorColors.green}

const ReachIndicatorFlex = styled.div`
    display: flex;
    flex-direction: row;
`
const EngagementBox = styled.div`
    width: 200px;
    height: 100px;
    border-style: solid;
    border-width: 1px;
    position: relative;
    margin: 5px; 
    ${({ theme }): string => `
        background-color: ${theme.colors.background};
        border-color: ${theme.colors.border};
    `}
`
const EngagementProgressBar = styled.div<ReachIndicatorProps>`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    max-width: 185px; 
    left: 5px;
    ${({ theme, engageNum, engageGoal, percentMark }): string => `
        font-family: ${theme.font.family};
        background-color: ${(getEngagementAmount(engageNum, engageGoal) >= percentMark)
        ? 'green'
        : 'red'
        };
    `}
    width: ${ReachIndicator => getEngagementAmount(ReachIndicator.engageNum, ReachIndicator.engageGoal)}%;    
`
const ReachedProgressBar = styled.div<ReachIndicatorProps>`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    max-width: 185px; 
    left: 5px;
    ${({ theme }): string => `
        font-family: ${theme.font.family};
    `}
    
    width: ${ReachIndicator => getReachAmount(ReachIndicator.reachNum, ReachIndicator.reachGoal)}%;
    background-color: ${(ReachIndicator => getReachAmount(ReachIndicator.reachNum, ReachIndicator.reachGoal) >= ReachIndicator.percentMark
        ? 'green'
        : 'red'
    )};
}}
`
const LoadingBar = styled.div`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    left: 5px;
    width: 185px; 
    ${({ theme }): string => `
        background-color: ${theme.colors.border}; 
    `}
`
const EngagementTheme = styled.header`
    font-size: 20px;
    padding-top: 2px;
    padding-bottom: 3px;
    padding-left: 5px; 
    ${({ theme }): string => `
        color: ${theme.colors.text}
    `}
`
const EngagementHeader = styled(EngagementTheme)`
    font-weight: bold; 
`