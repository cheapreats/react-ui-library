import React from 'react';
interface IBoxProps extends IDivProps, IImgProps {
    imgSrc: string;
}
export interface IBoxComposition2Props extends React.HTMLAttributes<HTMLDivElement> {
    desktopBox: IBoxProps;
    mobileBox: IBoxProps;
    notificationBox: IBoxProps;
}
export declare const BoxComposition2: React.FC<IBoxComposition2Props>;
interface IDivProps {
    top: number;
    left: number;
}
interface IImgProps {
    width: number;
    height: number;
    borderRadius: number;
}
export {};
