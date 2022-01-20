import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { Button } from '@Inputs/Button/Button';
import { CardProps, Card } from '../Card/Card';

enum OperationState{
    isFailure,
    isSuccess,
    isLoading,
    isUnknown,
}

export interface IPanelCardProps extends CardProps {
    /** callback for cancel loading file */
    onCancelLoading?: () => void;
    name?:string;
    isFailureMessage?: string;
    isSuccessMessage?: string;
    isLoadingMessage?: string;
    cancelLoadingButtonText?: string;
    operationState?:OperationState;
    isSuccessIcon?:StyledIcon;
    isFailureIcon?:StyledIcon;
    /** icons width and height */
    iconDimensions?:number;
}

export const PanelCard: React.FC<IPanelCardProps> = ({
    onCancelLoading = () => null,
    isFailureMessage = '',
    isLoadingMessage = '',
    isSuccessMessage = '',
    cancelLoadingButtonText = 'Cancel',
    name='',
    operationState=OperationState.isUnknown,
    isSuccessIcon=,
    isFailureIcon=,
    ...props
}): React.ReactElement => {
    const renderContent=useCallback(()=>{
        switch(operationState){
            case OperationState.isFailure:
                return 
        }

    },[isFailureMessage,isLoadingMessage,isSuccessMessage,operationState])
    return (
        <Card {...props}>
            <div>{isFailureMessage || isLoadingMessage || isSuccessMessage}</div>
            {isLoadingMessage && (
                <Button onClick={onCancelLoading}>{cancelLoadingText}</Button>
            )}
        </Card>
    );
}

const Icon=styled.svg`
width:60px;
height:60px;
`