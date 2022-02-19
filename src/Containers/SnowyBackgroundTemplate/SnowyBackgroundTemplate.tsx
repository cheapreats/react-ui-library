import { Card } from '@Containers/Card/Card';
import { Heading } from '@Text/Heading';
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
        <StyledCard children={(children)} />
    </StyledDiv>
);

const StyledDiv = styled.div<{ backgroundColor: string }>`
    width: 100%;
    height: 100%;
    position: absolute;
    ${({ backgroundColor }): string => `
        background-color: ${backgroundColor};
    `}
`;

const StyledCard = styled(Card)`
  width: 60%;
  text-align: center;
  margin-top: 10em;
  margin-left: auto;
  margin-right: auto;
  postion: relative;
  padding: 3em;
`;


export default SnowyBackgroundTemplate;