import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IPanelProps, OperationState } from '../FileUploadV2/FileUploadV2';
import { Card as C, CardProps } from '../Card/Card';
import { Button as B } from '../../Inputs/Button/Button';

interface IPanelCardProps extends IPanelProps, CardProps {}

export const PanelCard: React.FC<IPanelCardProps> = ({
    onCancelUploading = () => null,
    operationState = OperationState.isUnknown,
    name = '',
    messageIsFailure = 'Something went wrong',
    messageIsSuccess = 'Completed',
    messageIsLoading = `loading ${name} ...`,
    ...props
}) => {
    const getMessage = useCallback((): string => {
        switch (operationState) {
            case OperationState.isFailure:
                return messageIsFailure;
            case OperationState.isSuccess:
                return messageIsSuccess;
            case OperationState.isLoading:
                return messageIsLoading;
            default:
                return '';
        }
    }, [operationState]);

    return (
        <Card {...props}>
            <div>{getMessage()}</div>
            {operationState === OperationState.isLoading && (
                <div>
                    <Button onClick={onCancelUploading}>Cancel</Button>
                </div>
            )}
        </Card>
    );
};

const Card = styled(C)``;
const Button = styled(B)``;
