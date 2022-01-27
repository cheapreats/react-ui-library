import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useGetWidth } from '@Utils/Hooks';
import { MainTheme } from '@Themes/MainTheme';

const DEFAULT_WIDTH = 0;
const OUTER_BAR_OPACITY = 0.4;
const TAKE_FULL_WIDTH = 'ejuhuhuhuuhnuhuhuh';

export interface IRatingBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** a number between 0 and 1 */
    rating?: number;
    color?: string;
    thickness?: number;
}

export const RatingBar: React.FC<IRatingBarProps> = ({
    rating=0,
    color = MainTheme.colors.statusColors.orange,
    thickness = 10,
    ...props
}) => {
    const innerRating=useMemo(()=>{
        if(rating>1) return 1;
        if(rating<0) return 0;
        return rating;
    },[rating])
    const [fullBarWidth, barRef] = useGetWidth();
    const ratingBarWidth = useMemo(
        () => (fullBarWidth ?? DEFAULT_WIDTH) * innerRating,
        [fullBarWidth, innerRating],
    );

    return (
        <Container {...props} ref={barRef} width={fullBarWidth}>
            <RatingBarBox
                opacity={OUTER_BAR_OPACITY}
                color={color}
                height={thickness}
            >
                {TAKE_FULL_WIDTH}
            </RatingBarBox>
            <RatingBarBox
                color={color}
                width={ratingBarWidth}
                height={thickness}
                isInner
            />
        </Container>
    );
};

const RatingBarBox = styled.div<
    Pick<IRatingBarProps, 'color'> & {
        opacity?: number;
        width?: number;
        height: number;
        isInner?: boolean;
    }
>`
    border-radius: ${({ theme }) => theme.dimensions.radius};
    background-color: ${({ color }) => color};
    color: ${({ color }) => color};
    ${({ opacity }) => ` ${opacity !== undefined ? `opacity:${opacity};` : ''}`}
    ${({ width }) => `
    ${width !== undefined ? `width:${width}px;` : ''}`}
    height:${({ height }) => height}px;
    overflow: hidden;
    ${({ isInner }) => `
    ${isInner ? 'position:absolute;top:0;left:0;' : ''}
    `}
    box-sizing:border-box;
`;

const Container = styled.div<{width?:number;}>`
    position: relative;
    box-sizing:border-box;
    ${({width})=>`
    ${width?`width:${width}px`:''}
    `}
    border-radius: ${({ theme }) => theme.dimensions.radius};
    overflow:hidden;
`;
