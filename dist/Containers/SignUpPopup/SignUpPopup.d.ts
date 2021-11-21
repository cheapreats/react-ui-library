import { ReactElement } from 'react';
export interface ISignUpPopupProps {
    heading: string;
    subHeading?: string;
    inputPlaceholder: string;
    handleSubmit: (arg0: {
        preventDefault: () => void;
    }, arg1: string) => void;
}
export declare const SignUpPopup: ({ heading, subHeading, inputPlaceholder, handleSubmit, }: ISignUpPopupProps) => ReactElement;
