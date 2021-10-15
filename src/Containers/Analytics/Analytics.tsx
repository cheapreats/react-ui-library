import React from 'react';
import styled from 'styled-components';


export interface IAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	value: number;
	change?: string;
}

export const Analytics: React.FC<IAnalyticsProps> = ({
    title,
    value,
    change,
    ...props
}): React.ReactElement => {
    const NUMERIC_SUFFIXES  = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
    const SHIFT_POINT       = 1000;

    /**
     * Takes in the number count and reduces it down to a more reasonable size using common numeric suffixes
     * @param count the number you wish to minimize
     * @returns a string representing the minimized number
     */
    const minimizeLargeNumber = (count: number) => {
        let shiftCount = 0;
        while (count >= SHIFT_POINT && shiftCount < NUMERIC_SUFFIXES.length - 1) {
            count /= SHIFT_POINT;
            shiftCount += 1;
        }
        let roundedNumber = count.toFixed();
        if (shiftCount > 0) {
            if (count > 100) {
                roundedNumber = count.toFixed(0);
            } else if (count > 10) {
                roundedNumber = count.toFixed(1);
            } else {
                roundedNumber = count.toFixed(2);
            }
        }

        return roundedNumber + NUMERIC_SUFFIXES[shiftCount];
    };

    return(
        <div {...props}>
            <Title>
                {title}
            </Title>
            <Value>
                {minimizeLargeNumber(value)}
                <Percentage>
                    {change}
                </Percentage>
            </Value>
        </div>
    );
}

const Title = styled.p`
    ${({theme}): string =>`
    font-size: ${theme.font.size.small};
    `}

    margin-bottom: 8px;
`;

const Value = styled.p`
    ${({theme}): string =>`
    font-size: ${theme.font.size.h2};
    `}

    font-weight: 600;
    margin: 0;
`;

const Percentage = styled.sup`
    ${({theme}): string =>`
    font-size: ${theme.font.size.small};
    `}

    font-weight: normal;
    margin-left: .25rem;
    position: relative;
    top: -0.4rem
`;
