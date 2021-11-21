import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
interface ConfirmModalProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    confirmDelete: string;
    yesButtonLabel: string;
    noButtonLabel: string;
    onConfirm: () => void;
    onReject?: () => void;
}
export declare const ConfirmModal: React.FC<ConfirmModalProps>;
export {};
