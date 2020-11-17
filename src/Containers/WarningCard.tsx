import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { ExclamationTriangle } from '@styled-icons/fa-solid/ExclamationTriangle';
import { Trash } from '@styled-icons/fa-solid/Trash';
import { Card as C, CardProps } from './Card';
import { Heading } from '../Text';
import { transition, flex } from '../Utils/Mixins';
import { Button } from '../Inputs/Button';

export interface IWarningCardProps extends CardProps {
    action: Function;
    headerText?: string;
    buttonText?: string;
    buttonMargin?: string;
    icon?: StyledIcon;
    iconSize?: string;
    buttonIcon?: StyledIcon;
    flexDirection?: string;
}

export const WarningCard: React.FC<IWarningCardProps> = ({
    action,
    headerText,
    buttonText,
    buttonMargin = '10px auto 10px 0',
    icon = ExclamationTriangle,
    iconSize = '30px',
    buttonIcon = Trash,
    flexDirection = 'column',
    children,
    ...props
}): React.ReactElement => {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        if (!loading && action) {
            setLoading(true);
            await action();
            setLoading(false);
        }
    };
    return (
        <Card {...props} flexDirection={flexDirection}>
            <HeadingDiv>
                {icon && <Icon as={icon} iconSize={iconSize} />}
                {headerText && (
                    <Heading color="primary" bold>
                        {headerText}
                    </Heading>
                )}
            </HeadingDiv>
            {children}
            <Button
                margin={buttonMargin}
                onClick={onClick}
                icon={buttonIcon}
                loading={loading}
                primary
            >
                {buttonText}
            </Button>
        </Card>
    );
};

interface IContainerProps extends CardProps {
    flexDirection: string;
}

interface IIconProps {
    iconSize: string;
}

const Card = styled(C)<IContainerProps>`
    ${transition(['opacity'])}
    ${({ theme, flexDirection }) => `
        border: 1.5px solid ${theme.colors.primary};
        ${flex(flexDirection)};
    `}
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
`;

const HeadingDiv = styled.div`
    ${flex('flex-start', 'center')}
`;

const Icon = styled.svg<IIconProps>`
    ${({ iconSize, theme }) => `
        width: ${iconSize};
        color: ${theme.colors.primary};
    `}
    margin: 0 10px 0 0;
`;
