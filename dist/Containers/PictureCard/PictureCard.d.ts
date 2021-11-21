import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface TagProps {
    icon: StyledIcon;
    text: string;
}
export interface PictureCardProps extends MainInterface, ResponsiveInterface, CardProps {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    borderRadiusTop?: string;
    borderRadiusBottom?: string;
}
export declare const PictureCard: React.FC<PictureCardProps>;
interface CardProps {
    width?: string;
    height?: string;
    borderRadiusTop?: string;
    borderRadiusBottom?: string;
}
export {};
