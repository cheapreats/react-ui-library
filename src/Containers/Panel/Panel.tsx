import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IPanelProps, OperationState } from '../FileUploadV2/FileUploadV2';
import { Card as C } from '../Card/Card';
import { Button as B } from '../../Inputs/Button/Button';

export const Panel: React.FC<IPanelProps> = ({
    onCancelUploading = () => null,
    panel = null,
    ...props
}) => {
    const getMessage = useCallback((): string => {
        if (panel) {
            switch (panel.operationState) {
            case OperationState.isFailure:
                return 'something went wrong';
            case OperationState.isSuccess:
                return 'completed';    
            case OperationState.isLoading:
                return `loading ${panel.name} ...`;
            default:
                return '';
            }
        }
        return '';
    }, [panel]);

    return (
        <Card {...props}>
            <div>{getMessage()}</div>
            {panel?.operationState === OperationState.isLoading && (
                <div>
                    <Button onClick={onCancelUploading}>Cancel</Button>
                </div>
            )}
        </Card>
    );
};

const Card = styled(C)``;
const Button = styled(B)``;
