import React from 'react';
import styled, {useTheme} from "styled-components";

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
            <div>
                <PieChart AverageWaitTime={AverageWaitTime} />
            </div>

            <TextFormatting>
                <div>
                    <TextAvgWait>Avg. Wait</TextAvgWait>
                    <TextTime> {AverageWaitTime} Min</TextTime>
                </div>
            </TextFormatting>
        </Row>
    );
};


/**
 * This function will determine what color the Pie Chart will be
 * @param AverageWaitTime {Number} - Number given from getTimeDifference() function
 * @return {string} - Hexadecimal of color
 */
function getColor(AverageWaitTime: Number){
    const BUSY = 30;
    const STARTING_TO_GET_BUSY = 15;
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
const TextAvgWait = styled.div`

    font-size: 3rem;
`;

const TextTime = styled.div`

    font-size: 3rem;
`;

const TextFormatting = styled.div`

    padding-left: 14rem;
    padding-top: 2rem;
`;

const Row = styled.div`

        display: flex;
        flex-wrap: wrap;
        margin-right: 15px;
        margin-left: 15px;
`;

const PieChart = styled.div<Pick<IWaitTimeDisplay,"AverageWaitTime">>`

        flex-basis: 0;
        max-width: 100%;
        display: block; 
        position: absolute; 
        width: 11rem; 
        height: 11rem; 
        border-radius: 50%; 
        
        background-image: conic-gradient( 
            ${ ({AverageWaitTime}) => getColor(AverageWaitTime) } ${({AverageWaitTime}) => AverageWaitTime * 6 }deg,  
            grey 0 235deg  
        ); 
`;