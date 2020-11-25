import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DroppableContainerContentsProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabel: string[],
};

const NO_OF_LABELS = 1;

export const DroppableContainerContents: React.FC<DroppableContainerContentsProps> = ({
    droppableLabel,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper display={droppableLabel.length === NO_OF_LABELS} {...props}>
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
    ${({ display }): string => `
        ${display ? Mixins.flex('center') : Mixins.flex('space-between') };
    `};
    padding: 10px;
`;