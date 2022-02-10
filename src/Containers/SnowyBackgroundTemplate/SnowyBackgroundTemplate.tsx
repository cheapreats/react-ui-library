import React from 'react';
import Snowfall from 'react-snowfall';
import styled from 'styled-components';

export interface ISnowyBackgroundProps {
    backgroundColor?: string,
    snowColor?: string,
    children?: React.ReactElement,
}

export const SnowyBackgroundTemplate: React.FC<ISnowyBackgroundProps> = ({
    backgroundColor = '#ff6666',
    snowColor = 'white',
    children,
    ...props
}): React.ReactElement => (
    <StyledDiv backgroundColor={backgroundColor} {...props} >
        <Snowfall color={snowColor} />
        <div children={children} />
    </StyledDiv>
);

const Container = styled.div`
`;

const StyledDiv = styled.div<{ backgroundColor: string }>`
    width: 100%;
    height: 100%;
    position: absolute;
    ${({ backgroundColor }): string => `
        background-color: ${backgroundColor};
    `}
`;


export default SnowyBackgroundTemplate;