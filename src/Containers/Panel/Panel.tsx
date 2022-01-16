import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IPanelProps, OperationState } from '../FileUploadV2/FileUploadV2';
import { Card as C, CardProps } from '../Card/Card';
import { Button as B } from '../../Inputs/Button/Button';
import { Loading } from '../Loading/Loading';

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
    const renderContent = useCallback((): React.ReactNode => {
        switch (operationState) {
            case OperationState.isFailure:
                return <div>{messageIsFailure}</div>;
            case OperationState.isSuccess:
                return <div>{messageIsSuccess}</div>;
            case OperationState.isLoading:
                return (
                    <div>
                        <Loading message={messageIsLoading} loading isNotPositionAbsolute />
                        <Button onClick={onCancelUploading}>Cancel</Button>
                    </div>
                );
            default:
                return null;
        }
    }, [operationState]);

    return <Card {...props}>{renderContent()}</Card>;
};

const Card = styled(C)``;
const Button = styled(B)`
`;
