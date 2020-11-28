import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface DroppableContainerContentsProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabel: string[],
};

export const DroppableContainerContents: React.FC<DroppableContainerContentsProps> = ({
    droppableLabel,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {droppableLabel.map(label => (
                <div key={label}>
                    {label}
                </div>
            ))}
        </Wrapper>
    );
}

interface WrapperProps {
    display?: boolean,
};
const Wrapper = styled.div<WrapperProps>`
    ${flex("space-between")};
    div:only-child {
        margin: 0 auto;
    }
    padding: 10px;
`;