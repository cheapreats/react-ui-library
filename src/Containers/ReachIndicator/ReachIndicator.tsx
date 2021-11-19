import React from 'react';
import styled from 'styled-components';

export interface ReachIndicatorProps {
    engageNum: number, // Number of 'post' engagements
    engageGoal: number, // Goal number of engagements, defines what percent of the engagement bar is filled
    reachNum: number, // Number of people 'post' reached 
    reachGoal: number, // Goal number of people reached, defines what percent of the reached bar is filled
    percentMark: number, // Percent mark threshold that changes bar colour
    indicatorMinimum: number, //EngagementBox must be greater than indicator minimum to render. Default value should be 0
}

const ReachIndicatorCard: React.FC<ReachIndicatorProps> = ({
    engageNum,
    engageGoal,
    reachNum,
    reachGoal,
    percentMark,
    indicatorMinimum, 
    ...props
}): React.ReactElement => (
    <EngagementBox {...props}>
        { !!engageNum && <>
            <EngagementHeader>{engageNum}</EngagementHeader>
            <EngagementTheme>Post Engagements</EngagementTheme>
            <EngagementProgressBar engageNum={engageNum} engageGoal={engageGoal} reachNum={reachNum} reachGoal={reachGoal} percentMark={percentMark} indicatorMinimum={indicatorMinimum}/>
            <LoadingBar/>
            </> 
        }
        { !!reachNum && <>
            <EngagementHeader>{reachNum}</EngagementHeader>
            <EngagementTheme>People Reached</EngagementTheme>
            <ReachedProgressBar engageNum={engageNum} engageGoal={engageGoal} reachNum={reachNum} reachGoal={reachGoal} percentMark={percentMark} indicatorMinimum={indicatorMinimum}/>
            <LoadingBar/>
            </>
        }
    </EngagementBox>
    );

export const ReachIndicator: React.FC<ReachIndicatorProps> = ({
    engageNum,
    engageGoal,
    reachNum,
    reachGoal,
    percentMark,
    indicatorMinimum, 
    ...props
}): React.ReactElement => ( 
    <ReachIndicatorFlex {...props}>
        { !!(engageNum > indicatorMinimum) && <ReachIndicatorCard engageNum={engageNum} engageGoal={engageGoal} reachNum={0} reachGoal={0} percentMark={percentMark} indicatorMinimum={indicatorMinimum}/> }
        { !!(reachNum > indicatorMinimum) && <ReachIndicatorCard engageNum={0} engageGoal={0} reachNum={reachNum} reachGoal={reachGoal} percentMark={percentMark} indicatorMinimum={indicatorMinimum}/> }
    </ReachIndicatorFlex> 
);

/**
 * Takes two numbers, divides num1 by num2 and turns it into a percentage out of 100
 * @param Num1
 * @param Num2
 */
function getPercentage(Num1: number, Num2: number) {
    return ((Num1 / Num2) * 100) 
}

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
    max-width: 190px; 
    left: 5px;
    ${({ theme, engageNum, engageGoal, percentMark }): string => `
        font-family: ${theme.font.family};
        background-color: ${(getPercentage(engageNum, engageGoal) >= percentMark)
            ? theme.colors.reachIndicatorColors.green
            : theme.colors.reachIndicatorColors.red
        };
    `}
    width: ${ReachIndicator => getPercentage(ReachIndicator.engageNum, ReachIndicator.engageGoal)}%;    
`
const ReachedProgressBar = styled.div<ReachIndicatorProps>`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    max-width: 190px; 
    left: 5px;
    ${({ theme, reachNum, reachGoal, percentMark }): string => `
        font-family: ${theme.font.family};
         background-color: ${(getPercentage(reachNum, reachGoal) >= percentMark)
        ? theme.colors.reachIndicatorColors.green
        : theme.colors.reachIndicatorColors.red
        };
    `}
    width: ${ReachIndicator => getPercentage(ReachIndicator.reachNum, ReachIndicator.reachGoal)}%;
}}
`
const LoadingBar = styled.div`
    height: 20px;
    border-radius: 20px;
    position: absolute;
    left: 5px;
    width: 190px; 
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