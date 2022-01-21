import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { CheckCircle } from '@styled-icons/fa-solid/CheckCircle';
import { TimesCircle } from '@styled-icons/fa-solid/TimesCircle';
import { MainTheme } from '@Themes';
import { flex } from '@Utils/Mixins';
import { CardProps, Card } from '../Card/Card';
import { Loading as L } from '../Loading/Loading';

export enum OperationState {
    isFailure,
    isSuccess,
    isLoading,
    isUnknown,
}

export interface IPanelCardProps extends CardProps {
    /** name of the file */
    name?: string;
    isFailureMessage?: string;
    isSuccessMessage?: string;
    isLoadingMessage?: string;
    operationState?: OperationState;
    isSuccessIcon?: StyledIcon;
    isFailureIcon?: StyledIcon;
    isSuccessIconColor?:string;
    isFailureIconColor?:string;
    /** icons width and height */
    iconHeight?: number;
    dismissButtonOnSuccess?:React.ReactElement;
    retryButtonOnFailure?:React.ReactElement;
    cancelButtonOnLoading?:React.ReactElement;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    isFailureMessage = 'Something went wrong',
    isSuccessMessage = 'Completed',
    name = '',
    isLoadingMessage = `Loading file ${name}...`,
    operationState = OperationState.isUnknown,
    isSuccessIcon = CheckCircle,
    isFailureIcon = TimesCircle,
    iconHeight = 35,
    isSuccessIconColor=MainTheme.colors.statusColors.green,
    isFailureIconColor=MainTheme.colors.statusColors.red,
    retryButtonOnFailure,
    cancelButtonOnLoading,
    dismissButtonOnSuccess,
    ...props
}): React.ReactElement => {
    const renderContent = useCallback((): React.ReactNode => {
        switch (operationState) {
        case OperationState.isFailure:
            return (
                <ContentContainer>
                    <div>
                        <Icon as={isFailureIcon} height={iconHeight} color={isFailureIconColor} />
                        <MessageContainer>{isFailureMessage}</MessageContainer>
                    </div>
                    {retryButtonOnFailure}
                </ContentContainer>
            );
        case OperationState.isSuccess:
            return (
                <ContentContainer>
                    <div>
                        <Icon as={isSuccessIcon} height={iconHeight} color={isSuccessIconColor} />
                        <MessageContainer>{isSuccessMessage}</MessageContainer>
                    </div>
                    {dismissButtonOnSuccess}
                </ContentContainer>
            );
        case OperationState.isLoading:
            return (
                <ContentContainer>
                    <Loading
                        message={isLoadingMessage}
                        isPartOfTheLayout
                        loading
                    />
                    {cancelButtonOnLoading}
                </ContentContainer>
            );
        default:
            return null;
        }
    }, [
        isFailureMessage,
        isLoadingMessage,
        isSuccessMessage,
        operationState,
        isSuccessIcon,
        isFailureIcon,
        iconHeight,
        isSuccessIconColor,
        isFailureIconColor,
        cancelButtonOnLoading,
        retryButtonOnFailure,
        dismissButtonOnSuccess,
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

const ContentContainer=styled.div`
${flex('space-between')}
`

const Loading=styled(L)`
flex:1;
`