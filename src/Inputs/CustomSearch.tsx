import React, { useState } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { Card as C } from '../Containers/Card';
import { Button as B } from './Button';
import { Select } from './Select';
import { SearchBar } from './SearchBar';
import { ComboBox } from './ComboBox';

interface TagProps {
    icon: StyledIcon;
    text: string;
}

interface StoreFeatureCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    rating?: string;
    heading?: string;
    description: string;
    linktitle?: string;
    priceValue?: string | number;
    locationValue?: string | number;
    foodValue?: string | number;
    priceOptions?: string[];
    locationOptions?: string[];
    foodOptions?: string[];
    pricePlaceholder?: string;
    locationPlaceholder?: string;
    foodPlaceholder?: string;
    onPriceChange?: Function;
    onLocationChange?: Function;
    onFoodChange?: Function;
}

export const CustomSearch: React.FC<StoreFeatureCardProps> = ({
    height,
    width,
    priceOptions,
    locationOptions,
    foodOptions,
    pricePlaceholder,
    locationPlaceholder,
    foodPlaceholder,
    onPriceChange = (): void => {},
    onLocationChange = (): void => {},
    onFoodChange = (): void => {},
    ...cardProps
}): React.ReactElement => {
    const [priceValue, setPriceValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [foodValue, setFoodValue] = useState('');

    const onCustomPriceChange = (target: any): void => {
        onPriceChange(target.value);
        setPriceValue(target.value);
    };
    const onCustomLocationChange = (target: any): void => {
        onLocationChange(target.value);
        setLocationValue(target.value);
    };
    const onCustomFoodChange = (target: any): void => {
        onFoodChange(target.value);
        setFoodValue(target.value);
    };

    const onCustomFoodChanging = (value: any): void => {
        onFoodChange(value);
    };
    return (
        <Card width={width} height={height} {...cardProps}>
            <FirstColumnContainer>
                <Select
                    label="PRICE"
                    placeholder={pricePlaceholder}
                    onChange={({ target }: any): void => {
                        onCustomPriceChange(target);
                    }}
                    value={priceValue}
                >
                    {priceOptions}
                </Select>
            </FirstColumnContainer>
            <SecondColumnContainer>
                <SearchBar
                    label="FOOD"
                    placeholder={foodPlaceholder}
                    suggestiveOptions={foodOptions}
                    onChange={({ target }: any): void => {
                        console.log(target);
                        onCustomFoodChange(target);
                    }}
                    onInput={(value: any): void => {
                        onCustomFoodChanging(value);
                    }}
                    value={foodValue}
                >
                    {foodOptions}
                </SearchBar>
            </SecondColumnContainer>
            <ThirdColumnContainer>
                <ComboBox
                    label="LOCATION"
                    placeholder={locationPlaceholder}
                    onChange={({ target }: any): void => {
                        onCustomLocationChange(target);
                    }}
                    value={locationValue}
                >
                    {locationOptions}
                </ComboBox>
            </ThirdColumnContainer>
            <Button primary>SEARCH</Button>
        </Card>
    );
};

interface CardProps {
    width?: string;
    height?: string;
    linktitle?: string;
}

const FirstColumnContainer = styled(C)`
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    width: 20%;
`;
const SecondColumnContainer = styled(C)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    width: 20%;
    svg {
        display: none;
    }
    input {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`;

const ThirdColumnContainer = styled(C)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    width: 40%;
`;

const Button = styled(B)`
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 20%;
`;

const Card = styled(C)<CardProps>`
    width: ${({ width }): string => width || 'auto'};
    height: ${({ height }): string => height || 'auto'};
    padding: 0px;
    display: flex;
    label {
        color: red;
    }
`;
