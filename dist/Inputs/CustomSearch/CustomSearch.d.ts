import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface TagProps {
    icon: StyledIcon;
    text: string;
}
export interface CustomSearchProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    rating?: string;
    heading?: string;
    description: string;
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
export declare const CustomSearch: React.FC<CustomSearchProps>;
export {};
