import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IPanelProps,OperationState } from '../FileUploadV2/FileUploadV2';

export {IPanelProps,OperationState};

export const Panel: React.FC<IPanelProps> = ({ operationState=OperationState.isUnknown, name='', ...props }) => {
    const getMessage = useCallback((): string => {
        switch (operationState) {
        case OperationState.isFailure:
            return 'something went wrong';
        case OperationState.isSuccess:
            return 'completed';
        case OperationState.isLoading:
            return `loading ${name} ...`;
        default:
            return '';
        }
    }, [name, operationState]);
    return <PanelContainer {...props}>{getMessage()}</PanelContainer>;
};

const PanelContainer = styled.div``;