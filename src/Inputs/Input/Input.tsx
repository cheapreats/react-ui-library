import React from 'react';
import { InputFragment, InputFragmentProps, LabelLayout, LabelLayoutProps } from '@Layouts';

export interface InputProps extends LabelLayoutProps, InputFragmentProps {
    disabled?: boolean;
    placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
    ...props
}): React.ReactElement => (
    <LabelLayout {...props}>
        <InputFragment {...props} />
    </LabelLayout>
);

export default Input;
