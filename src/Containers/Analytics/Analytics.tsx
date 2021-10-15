import React from 'react';
import styled from 'styled-components';

export interface AnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	value: number;
	change?: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({
    title,
    value,
    change,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        <Title>
            {title}
        </Title>
        <Value>
            {value}
            <Percentage>
                {change}
            </Percentage>
        </Value>
    </Container>
);

const Container = styled.div`

`;

const Title = styled.p`
    ${({theme}): string =>`font-size: ${theme.font.size.small};`}

    margin-bottom: 8px;
`;

const Value = styled.p`
    ${({theme}): string =>`font-size: ${theme.font.size.h2};`}

    font-weight: 600;
    margin: 0;
`;

const Percentage = styled.sup`
    ${({theme}): string =>`font-size: ${theme.font.size.small};`}

    font-weight: normal;
    margin-left: .25rem;
    position: relative;
    top: -0.4rem
`;
