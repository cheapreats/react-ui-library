import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { CheckCircle } from '@styled-icons/fa-solid/CheckCircle';
import { TimesCircle } from '@styled-icons/fa-solid/TimesCircle';
import { Button } from '@Inputs/Button/Button';
import { MainTheme } from '@Themes';
import { CardProps, Card } from '../Card/Card';
import { Loading } from '../Loading/Loading';

export enum OperationState {
    isFailure,
    isSuccess,
    isLoading,
    isUnknown,
}

export interface IPanelCardProps extends CardProps {
    /** callback for cancel loading file */
    onCancelLoading?: () => void;
    /** name of the file */
    name?: string;
    isFailureMessage?: string;
    isSuccessMessage?: string;
    isLoadingMessage?: string;
    cancelLoadingButtonText?: string;
    operationState?: OperationState;
    isSuccessIcon?: StyledIcon;
    isFailureIcon?: StyledIcon;
    isSuccessIconColor?:string;
    isFailureIconColor?:string;
    /** icons width and height */
    iconHeight?: number;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    onCancelLoading = () => null,
    isFailureMessage = 'Something went wrong',
    isSuccessMessage = 'Completed',
    cancelLoadingButtonText = 'Cancel',
    name = '',
    isLoadingMessage = `Loading file ${name}...`,
    operationState = OperationState.isUnknown,
    isSuccessIcon = CheckCircle,
    isFailureIcon = TimesCircle,
    iconHeight = 35,
    isSuccessIconColor=MainTheme.colors.statusColors.green,
    isFailureIconColor=MainTheme.colors.statusColors.red,
    ...props
}): React.ReactElement => {
    const renderContent = useCallback((): React.ReactNode => {
        switch (operationState) {
        case OperationState.isFailure:
            return (
                <div>
                    <Icon as={isFailureIcon} height={iconHeight} color={isFailureIconColor} />
                    <MessageContainer>{isFailureMessage}</MessageContainer>
                </div>
            );
        case OperationState.isSuccess:
            return (
                <div>
                    <Icon as={isSuccessIcon} height={iconHeight} color={isSuccessIconColor} />
                    <MessageContainer>{isSuccessMessage}</MessageContainer>
                </div>
            );
        case OperationState.isLoading:
            return (
                <div>
                    <Loading
                        message={isLoadingMessage}
                        isNotPositionedAbsolute
                        loading
                    />
                    <Button onClick={onCancelLoading}>
                        {cancelLoadingButtonText}
                    </Button>
                </div>
            );
        default:
            return null;
        }
    }, [
        isFailureMessage,
        isLoadingMessage,
        isSuccessMessage,
        operationState,
        onCancelLoading,
        cancelLoadingButtonText,
        isSuccessIcon,
        isFailureIcon,
        iconHeight,
        isSuccessIconColor,
        isFailureIconColor,
    ]);
    return <Card {...props}>{renderContent()}</Card>;
};

const Icon = styled.svg<{ height: number;color?:string; }>`
    height: ${({ height }) => height}px;
    ${({color})=>`
    ${color?`color:${color};`:''}
    `}
`;

const MessageContainer=styled.span`
margin:5px;
font-weight:700;
`