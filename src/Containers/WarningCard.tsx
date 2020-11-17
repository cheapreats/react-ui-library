import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { ExclamationTriangle } from '@styled-icons/fa-solid/ExclamationTriangle';
import { Trash } from '@styled-icons/fa-solid/Trash';
import { Card, CardProps } from './Card';
import { Heading } from '../Text';
import { transition, flex } from '../Utils/Mixins';
import { Button } from '../Inputs/Button';

export interface IWarningCardProps extends CardProps {
    onClick: React.MouseEventHandler;
    headerText?: string;
    buttonText?: string;
    loading?: boolean;
    icon?: StyledIcon;
    buttonIcon: StyledIcon;
}

export const WarningCard: React.FC<IWarningCardProps> = ({
    onClick,
    headerText,
    buttonText,
    loading,
    icon = ExclamationTriangle,
    buttonIcon = Trash,
    children,
    ...props
}): React.ReactElement => (
    <Container {...props} flat>
        <StyledHeading color="primary" bold>
            {icon && <Icon as={icon} />}
            {headerText}
        </StyledHeading>
        {children}
        <Button
            margin="12px 0 8px"
            onClick={onClick}
            icon={buttonIcon}
            loading={loading}
            primary
        >
            {buttonText}
        </Button>
    </Container>
);

const Container = styled(Card)`
    ${transition(['opacity'])}
    ${({ theme }) => `
        border: 1.5px solid ${theme.colors.primary};
    `}
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
`;

const StyledHeading = styled(Heading)`
    ${flex('flex-start', 'center')}
    margin-bottom: 8px;
`;

const Icon = styled.svg`
    width: 18px;
    margin-right: 8px;
`;
