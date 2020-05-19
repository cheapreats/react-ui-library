import React, { ReactNode } from 'react';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import styled from 'styled-components';
import { Card as C, CardProps } from './Card';
import { transition, position } from '../Utils/Mixins';

export interface FeaturesCardProps extends MainInterface, ResponsiveInterface {
    iconComponent: ReactNode;
    footerComponent: ReactNode;
    width: string;
    cardProps: CardProps;
}

export const FeaturesCard: React.FC<FeaturesCardProps> = ({
    children,
    iconComponent,
    footerComponent,
    cardProps,
    ...props
}): React.ReactElement => (
    <CardWrapper {...props}>
        <IconWrapper>{iconComponent}</IconWrapper>
        <Card {...cardProps}>
            <Content>{children}</Content>
            <FooterWrapper>{footerComponent}</FooterWrapper>
        </Card>
    </CardWrapper>
);

export default FeaturesCard;

const IconWrapper = styled(C)<CardProps>`
    ${position('absolute', 'auto', 0, 0, 'auto', 0)}
    border-radius: 50%;
    width: 30px;
    height: 30px;
    z-index: 1;
    ${transition(['transform'])}
`;

const FooterWrapper = styled.div`
    width: 100%;
    ${position('absolute', 0, 'auto', 'auto', 0, 0)}
    transform: translateY(50%);
    opacity: 0;
    ${transition(['transform', 'opacity'])}
`;

const Content = styled.div`
    padding: 25px 0 20px;
    transform: translateY(10px);
    ${transition(['transform'])}
`;

const Card = styled(C)<CardProps>`
    position: relative;
    overflow: hidden;
`;

const CardWrapper = styled.div<FeaturesCardProps>`
    position: relative;
    cursor: pointer;
    padding-top: 20px;
    width: ${({ width }): string => width || 'auto'};
    &:hover ${FooterWrapper}, &:hover ${Content} {
        opacity: 1;
        transform: translateY(0);
    }
    &:hover ${IconWrapper} {
        transform: translateY(-15px) scale(0.9);
    }
`;
