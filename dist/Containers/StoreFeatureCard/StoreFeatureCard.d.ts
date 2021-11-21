import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { StyledIcon } from 'styled-icons/types';
interface TagProps {
    icon: StyledIcon;
    text: string;
}
export interface StoreFeatureCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    rating?: string;
    heading?: string;
    description: string;
    linktitle?: string;
}
export declare const StoreFeatureCard: React.FC<StoreFeatureCardProps>;
export {};
