import React from 'react';
import { IContainerProps } from './StyledComponents';
interface IBottomPanelProps extends IContainerProps {
    children: React.ReactElement | undefined;
    isUploading: boolean;
    onCancelUploading: () => void;
}
export declare const BottomPanel: React.ForwardRefExoticComponent<IBottomPanelProps & React.RefAttributes<HTMLDivElement>>;
export {};
