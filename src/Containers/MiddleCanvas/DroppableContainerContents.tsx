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
    const getStyle = () => {
        return ({
            display: 'space-between'
        });
    };

    return (
        <Wrapper display={getStyle().display} {...props}>
            {droppableLabel.map(label => (
                <div>
                    {label}
                </div>
            ))}
        </Wrapper>
    );
}

interface WrapperProps {
    display?: string,
};

const Wrapper = styled.div<WrapperProps>`
    ${({ display }): string | undefined => `
        ${display && Mixins.flex(display)};
    `};
    padding: 0 10px;
`;