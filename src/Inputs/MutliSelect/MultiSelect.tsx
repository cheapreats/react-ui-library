import React from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '../../Fragments/LabelLayout';

export interface MultiSelectProps extends LabelLayoutProps {
    columns?: string | number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    columns = 2,
    children,
    ...props
}): React.ReactElement => {
    return (
        <LabelLayout {...props}>
            <Container columns={columns}>
                {React.Children.map(
                    children,
                    (child): false | React.ReactElement =>
                        React.isValidElement(child) &&
                        React.cloneElement(child, {
                            columns,
                        }),
                )}
            </Container>
        </LabelLayout>
    );
};

const Container = styled.div<{
    columns?: string | number;
}>`
    ${flex()}
    flex-wrap: wrap;
    ${({ theme }): string => `
        margin: 0 -${theme.dimensions.multiSelect.spacing}px;
    `}
`;
