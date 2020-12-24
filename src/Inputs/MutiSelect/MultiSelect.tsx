import React from 'react';
import styled from 'styled-components';
import { flex } from '../../Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '../../Fragments/LabelLayout';
import { MultiSelectContext } from './MultiSelectContext';

export interface MultiSelectProps
    extends LabelLayoutProps,
        React.HTMLAttributes<HTMLDivElement> {
    columns?: string | number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    columns = 2,
    children,
    ...props
}): React.ReactElement => (
    <MultiSelectContext.Provider value={columns}>
        <LabelLayout {...props}>
            <Container columns={columns}>{children}</Container>
        </LabelLayout>
    </MultiSelectContext.Provider>
);

const Container = styled.div<{
    columns?: string | number;
}>`
    ${flex()}
    flex-wrap: wrap;
    ${({ theme }): string => `
        margin: 0 -${theme.dimensions.multiSelect.spacing}px;
    `}
`;
