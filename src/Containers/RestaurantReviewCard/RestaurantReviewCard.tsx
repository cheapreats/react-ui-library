import React, { useMemo, useCallback } from 'react';
import { Card, CardProps } from '../Card/Card';
import { RatingItem } from '../RatingItem/RatingItem';

export interface IRestaurantReviewCardProps extends CardProps {
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
}

export const RestaurantReviewCard: React.FC<IRestaurantReviewCardProps> = ({
    fiveStars,
    fourStars,
    threeStars,
    twoStars,
    oneStar,
    ...props
}) => {
    const getRatings = useCallback(() => {
        const votes = fiveStars + fourStars + threeStars + twoStars + oneStar;
        return [
            oneStar / votes,
            twoStars / votes,
            threeStars / votes,
            fourStars / votes,
            fiveStars / votes,
        ];
    }, [fiveStars, fourStars, threeStars, twoStars, oneStar]);
    const ratingItems = useMemo(
        () =>
            getRatings().map((rating, index) => {
                const stars=index+1;
                if (
                    stars === 1 ||
                    stars === 2 ||
                    stars === 3 ||
                    stars === 4 ||
                    stars === 5
                ) {
                    return <RatingItem rating={rating} stars={stars} key={stars} />;
                }
                return null;
            }),
        [getRatings],
    );

    return (
        <Card widthFitContent {...props}>
            {ratingItems}
        </Card>
    );
};
