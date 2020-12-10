import React from 'react';
import { flex } from '@Utils/Mixins';
import { SmallText } from "@Text";
import styled, {useTheme} from "styled-components";

const BUSY = 30;
const STARTING_TO_GET_BUSY = 15;

export interface IWaitTimeDisplay {
    /**
     * The seating/reservation length of average wait time
     */
    AverageWaitTime: number,
}

/**
 * Primary UI component for user interaction
 * WaitTimeDisplay
 */
export const WaitTimeDisplay: React.FC<IWaitTimeDisplay>
    = ({
           AverageWaitTime = 29,
            ...props
       }) => {
    return (
        <Row {...props}>
                <PieChart AverageWaitTime={AverageWaitTime} />
            <TextPaddingLeftTop>
                    <SmallText size={'3rem'} bold>Avg. Wait</SmallText><br />
                    <SmallText size={'3rem'} bold >{AverageWaitTime} Min</SmallText>
            </TextPaddingLeftTop>
        </Row>
    );
};

/**
 * This function will determine what color the Pie Chart will be
 * @param AverageWaitTime {Number} - Number given from getTimeDifference() function
 * @return {string} - Hexadecimal of color
 */
function getColor(AverageWaitTime: Number){
    const {colors} = useTheme();
    if(AverageWaitTime >= BUSY){
        return colors.PieChartColors.Red;
    } else if(AverageWaitTime >= STARTING_TO_GET_BUSY && AverageWaitTime <= BUSY){
        return 	colors.PieChartColors.Yellow;
    } else {
        return colors.PieChartColors.Green;
    }
}

/**
 * variables for the styled components
 */

const TextPaddingLeftTop = styled.div`

    padding-left: 12rem;
    padding-top: 1rem;
`;

const Row = styled.div`

        display: flex;
        ${flex()};
        margin-right: 15px;
        margin-left: 15px;
`;

const PieChart = styled.div<Pick<IWaitTimeDisplay,"AverageWaitTime">>`

        flex-basis: 0;
        max-width: 100%;
        display: block; 
        position: absolute; 
        width: 10rem; 
        height: 10rem; 
        border-radius: 50%; 
        
        background-image: conic-gradient( 
            ${ ({AverageWaitTime}) => getColor(AverageWaitTime) } ${({AverageWaitTime}) => AverageWaitTime * 6 }deg,  
            grey 0 235deg  
        ); 
`;