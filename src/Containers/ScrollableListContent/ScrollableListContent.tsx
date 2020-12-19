import React from 'react';
import styled, { DefaultTheme, InterpolationFunction } from 'styled-components';
import { scroll, media } from '@Utils/Mixins';

export interface ScrollableListContentProps
    extends React.HTMLAttributes<HTMLDivElement> {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    withList?: boolean;
}

export const ScrollableListContent: React.FC<ScrollableListContentProps> = ({
    containerProps,
    children,
    withList,
    ...props
}): React.ReactElement => (
    <ScrollBox {...props}>
        <Container withList={withList} {...containerProps}>
            {children}
        </Container>
    </ScrollBox>
);

const ScrollBox = styled.div`
    ${scroll}
    overflow: auto;
    height: 100%;
`;

interface ContainerProps {
    withList?: boolean;
}

const Container = styled.div<ContainerProps>`
    padding: 20px 30px 20px;
    box-sizing: border-box;
    position: relative;
    ${({ withList }): string | InterpolationFunction<{ theme: DefaultTheme }> =>
        withList
            ? media(
                  'tablet',
                  `
                padding: 20px 20px 20px;
                padding-right: 20px;
                padding-left: 40px;
            `,
              )
            : ''}
`;
