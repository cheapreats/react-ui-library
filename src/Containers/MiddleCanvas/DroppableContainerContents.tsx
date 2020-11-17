import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DroppableContainerContentsProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabel: string[],
};

export const DroppableContainerContents: React.FC<DroppableContainerContentsProps> = ({
    droppableLabel,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper display={droppableLabel.length > 1} {...props}>
            {droppableLabel.map(label => (
                <div>
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
    ${({ display }): string | undefined => `
        ${display ? Mixins.flex('space-between') : Mixins.flex('center')};
    `};
    padding: 10px;
`;