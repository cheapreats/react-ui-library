import React from 'react';
import styled from 'styled-components';

const NUMERIC_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
const SHIFT_POINT = 1000;
const SHIFT_POINT_DIGIT_COUNT = 3;
const SIGNIFICANT_FIGURES = 3;
const BASE_10 = 10;

export interface IAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
    /* title on the component */
    title: string;
    /* the statistical value being displayed */
    value: number;
    /* optional parameter for displaying a change */
    change?: number;
}

export const Analytics: React.FC<IAnalyticsProps> = ({
    title,
    value,
    change,
    ...props
}): React.ReactElement => {
    /**
     * Takes in the value and reduces it a minimized form using numeric suffixes
     * @param count {number} - the number you wish to minimize
     * @returns {string} - minimized number
     */
    const minimizeLargeNumber = (count: number) => {
        if (Math.abs(count) < SHIFT_POINT) {
            return count;
        }

        const digitCount = Math.log10(Math.abs(count));
        let shiftCount = Math.floor(digitCount / SHIFT_POINT_DIGIT_COUNT);
        shiftCount = Math.min(shiftCount, NUMERIC_SUFFIXES.length - 1);

        const integralSignificantFigures = digitCount % SHIFT_POINT_DIGIT_COUNT;

        const reducedCount =
            count / BASE_10 ** (shiftCount * SHIFT_POINT_DIGIT_COUNT);
        const displayString = reducedCount.toFixed(
            SIGNIFICANT_FIGURES - integralSignificantFigures,
        );

        return displayString + NUMERIC_SUFFIXES[shiftCount];
    };

    return (
        <div {...props}>
            <Title>{title}</Title>
            <Value>
                {minimizeLargeNumber(value)}
                {change !== undefined && (
                    <Percentage change={change}>{change}%</Percentage>
                )}
            </Value>
        </div>
    );
};

interface IPercentageProps {
    change: number;
}

const Title = styled.p`
    ${({ theme }): string => `
    font-size: ${theme.font.size.small};
    `}

    margin-bottom: 8px;
`;

const Value = styled.p`
    ${({ theme }): string => `
    font-size: ${theme.font.size.h2};
    `}

    font-weight: 600;
    margin: 0;
`;

const Percentage = styled.sup<IPercentageProps>`
    ${({ theme }): string => `
    font-size: ${theme.font.size.small};
    `}

    color: ${({ theme, change }): string => {
        if (change === undefined || change === 0) {
            return theme.colors.statusColors.orange;
        }
        if (change > 0) {
            return theme.colors.statusColors.green;
        }
        return theme.colors.statusColors.red;
    }};

    font-weight: normal;
    margin-left: 0.25rem;
    position: relative;
    top: -0.4rem;
`;
