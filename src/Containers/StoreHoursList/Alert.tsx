import React from 'react';
import styled from 'styled-components';
import { CheckCircle } from '@styled-icons/boxicons-regular/CheckCircle';
import { Card } from '../Card';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { styledCondition } from '../../Utils/Mixins';

interface AlertProps extends 
    MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLSpanElement> {
            text?: string,
            icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>,
            success?: boolean,
            error?: boolean
};

export const Alert: React.FC<AlertProps> = ({
    text = 'Some text here',
    icon = CheckCircle,
    success = false,
    error = false
}): React.ReactElement => {
    return (
        <StyledCard success={success} error={error}> 
            <Icon as={icon} />
            { text }
        </StyledCard>
    );
};

const StyledCard = styled(Card)<AlertProps>`
    ${({ theme, error = false, success = false }): string => `
        background-color: ${styledCondition(
        error,
        theme.colors.input.error,
        success,
        theme.colors.input.success,
        theme.colors.input.default,
    )};
    `}
`;
const Icon = styled.svg`
    width: 22px;
    flex-shrink: 0;
    margin: 5px 12px;
`;