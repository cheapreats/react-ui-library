import React from 'react';
import styled from 'styled-components';
import { DotsVertical } from '@styled-icons/heroicons-outline/DotsVertical';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { styledCondition } from '../../Utils/Mixins';

export interface DraggableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    refObj?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined,
    isDragged?: boolean,
    isRecommended: boolean,
    isRequired: boolean
};

interface WrapperProps {
    isDragged: boolean,
    isRecommended: boolean,
    isRequired: boolean
};

interface IconProps {
    isRecommended: boolean,
    isRequired: boolean
};

const BACKGROUND_GRAY = '#b7b7b7';
const COLOR_ISREQUIRED = '#de001f';
const COLOR_ISRECOMMENDED = '#204a95';
const COLOR_DEFAULT = 'black';
const COLOR_WHITE = 'white';
const FONT_COLOR = '#4b4b4b';

export const DraggableElement: React.FC<DraggableElementProps> = ({
    refObj,
    isDragged,
    children,
    isRecommended,
    isRequired,
    ...props
}) => {
    return (
        <Wrapper
            ref={refObj}
            isDragged={isDragged ?? false}
            isRecommended={isRecommended}
            isRequired={isRequired}
            {...props}
        >
            <Icon 
                as={DotsVertical}
                isRecommended={isRecommended}
                isRequired={isRequired} 
            />
            { children }
        </Wrapper>
    );
};

const Wrapper = styled.div<WrapperProps>`
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
    color: FONT_COLOR;
    margin: 7px;
    padding: 5 10px;
    font-size: 0.7rem;
    border-radius: 10px;
    border: solid 0.5px BACKGROUND_GRAY;
    box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.15);
    ${({ isDragged, isRequired, isRecommended }): string => `
        border-left: 5px solid ${isDragged && styledCondition(
        isRequired,
        COLOR_ISREQUIRED,
        isRecommended,
        COLOR_ISRECOMMENDED,
        COLOR_DEFAULT
    )};
        background-color: ${styledCondition(
        isDragged,
        BACKGROUND_GRAY,
        COLOR_WHITE
    )};
    `}

    :hover {
        background-color: ${BACKGROUND_GRAY};
    }
`;
const Icon = styled.svg<IconProps>`
    height: 22px;
    flex-shrink: 0;
    ${({ isRequired, isRecommended }): string => `
        color: ${styledCondition(
        isRequired,
        COLOR_ISREQUIRED,
        isRecommended,
        COLOR_ISRECOMMENDED,
        COLOR_DEFAULT
    )};
    `}
`;