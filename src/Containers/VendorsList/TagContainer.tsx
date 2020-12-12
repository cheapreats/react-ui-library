import React from 'react';
import styled from 'styled-components';
import { Tag, TagProps } from '../Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface ITagContainerProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    tags: string[];
    hasHoverMode?: boolean;
    tagProps?: TagProps;
};

export const TagContainer: React.FC<ITagContainerProps> = ({
    tags,
    hasHoverMode,
    tagProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {tags.map(tagText => (
                <Tag hasHoverMode={hasHoverMode} {...tagProps}>
                    {tagText}
                </Tag>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    flex-wrap: wrap;
    ${flex('start')};
`;