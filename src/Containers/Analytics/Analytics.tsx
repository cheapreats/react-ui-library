import React from 'react';
import styled from 'styled-components';

export interface AnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	value: number;
	change?: number;
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

`;

const Value = styled.p`

`;

const Percentage = styled.span`

`;