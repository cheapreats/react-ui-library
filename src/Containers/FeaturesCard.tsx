import React from 'react';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { StyledIcon } from 'styled-icons/types';
import styled from 'styled-components';
import { Card, CardProps } from './Card';

export interface FeaturesCardProps extends MainInterface, ResponsiveInterface {
    icon: StyledIcon;
    iconColor: string;
    width: number;
}

const CardWrapper = styled.div<FeaturesCardProps>`
    position: relative;
    padding-top: 30px;
    ${({ width }): string => (width ? `width: ${width}px;` : '')}
`;

const IconWrapper = styled(Card)<CardProps>`
    position: absolute;
    left: calc(50% - 30px);
    top: 0;
    border-radius: 50%;
`;

const Icon = styled.svg`
    width: 30px;
    height: 30px;
    ${({ color }) => (color ? `color: ${color};` : '')}
`;

const Content = styled.div`
    padding-top: 25px;
`;

export const FeaturesCard: React.FC<FeaturesCardProps> = ({
    children,
    icon,
    iconColor,
    width,
    ...props
}): React.ReactElement => (
    <CardWrapper width={width} {...props}>
        <IconWrapper>
            <Icon as={icon} color={iconColor} />
        </IconWrapper>
        <Card>
            <Content>{children}</Content>
        </Card>
    </CardWrapper>
);

export default FeaturesCard;
