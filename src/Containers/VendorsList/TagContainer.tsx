import React from 'react';
import styled from 'styled-components';
import { Tag, TagProps } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface ITagContainerProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    tags: string[];
    isHoverable?: boolean;
    tagProps?: Omit<TagProps, 'children'>;
}

export const TagContainer: React.FC<ITagContainerProps> = ({
    tags,
    isHoverable,
    tagProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {tags.map((tagText) => (
                <Tag isHoverable={isHoverable} {...tagProps}>
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
    ${media(
        'phone',
        `
       ${flex('column', 'center')};
    `,
    )}
`;
