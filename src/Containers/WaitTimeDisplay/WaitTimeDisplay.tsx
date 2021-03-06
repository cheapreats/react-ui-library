import React from 'react';
import styled, { useTheme } from 'styled-components';

const BUSY = 30;
const STARTING_TO_GET_BUSY = 15;
const MULTIPLY_DEGREE_ANGLE = 6;

export interface IWaitTimeDisplay {
    /**
     * The seating/reservation length of average wait time
     */
    AverageWaitTime: number;
}

/**
 * Primary UI component for user interaction
 * WaitTimeDisplay
 */
export const WaitTimeDisplay: React.FC<IWaitTimeDisplay> = ({
    AverageWaitTime = BUSY,
    ...props
}) => {
    const { colors } = useTheme();

    return (
        <ContainerForComponent {...props}>
            <Row>
                <Col3>
                    <PieChart
                        AverageWaitTime={AverageWaitTime}
                        backgroundColor={colors.chairTableBackground}
                    />
                </Col3>
                <Col8>
                    <FontStyles>Average Wait</FontStyles>
                    <FontStylesForTime>{AverageWaitTime} Min</FontStylesForTime>
                </Col8>
            </Row>
        </ContainerForComponent>
    );
};

/**
 * variables for the styled components
 */

const ContainerForComponent = styled.div`
    height: 40px;
    width: 165px;
`;

const FontStyles = styled.div`
    font-size: 14px;
    line-height: 17.5px;
`;

const FontStylesForTime = styled(FontStyles)`
    font-weight: bold;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
`;

const Col = styled.div`
    position: relative;
    width: 100%;
    padding-top: 0.2rem;
`;

const Col3 = styled(Col)`
    flex: 0 0 25%;
    max-width: 25%;
`;

const Col8 = styled(Col)`
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
    margin-left: 4rem;
`;

/**
 * This function will determine what color the Pie Chart will be
 * @param AverageWaitTime {Number} - Number given from getTimeDifference() function
 * @return {string} - Hexadecimal of color
 */
function getColor(AverageWaitTime: Number) {
    const { colors } = useTheme();
    if (AverageWaitTime >= BUSY) {
        return colors.PieChartColors.Red;
    }
    if (AverageWaitTime >= STARTING_TO_GET_BUSY && AverageWaitTime <= BUSY) {
        return colors.PieChartColors.Yellow;
    }
    return colors.PieChartColors.Green;
}

interface IPieChart {
    backgroundColor: string;
    AverageWaitTime: number;
}

const PieChart = styled.div<IPieChart>`
    flex-basis: 0;
    max-width: 100%;
    display: block;
    position: absolute;
    margin-left: 1rem;
    margin-top: 0.2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-image: conic-gradient(
        ${({ AverageWaitTime }) => getColor(AverageWaitTime)}
            ${({ AverageWaitTime }) =>
                AverageWaitTime * MULTIPLY_DEGREE_ANGLE}deg,
        ${({ backgroundColor }) => backgroundColor} 0 235deg
    );
`;
