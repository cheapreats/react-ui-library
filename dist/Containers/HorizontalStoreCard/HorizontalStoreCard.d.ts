import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface TagProps {
    icon: StyledIcon;
    text: string;
}
export interface HorizontalStoreCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    pictureTags?: TagProps[];
    headerTags?: string[];
    tags?: string[];
    alt?: string;
    height?: string;
    width?: string;
    rating?: string;
    heading?: string;
    description: string;
}
export declare const HorizontalStoreCard: React.FC<HorizontalStoreCardProps>;
export {};
