import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DroppableContainerContentsProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    styling: string,
    droppableLabel: string[],
    isColumn: boolean
};

interface WrapperProps {
    display?: string,
    isColumn?: boolean
}

export const DroppableContainerContents: React.FC<DroppableContainerContentsProps> = ({
    styling,
    droppableLabel,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper display={styling} {...props}>
            {Object.values(droppableLabel).map(label => (
                <div>
                    {label}
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
    ${({ isColumn }): string => `
        ${isColumn ? Mixins.flex('column') : ''};
        padding: ${isColumn ? '5px' : ''};
    `};
    padding: 0 10px;
`;