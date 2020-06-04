import React from 'react';
import {
    LabelLayout,
    LabelLayoutProps,
    InputFragment,
    InputFragmentProps,
} from '@Layouts';

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
