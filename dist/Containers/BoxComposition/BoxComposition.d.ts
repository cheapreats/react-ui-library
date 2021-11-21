import React from 'react';
interface IBoxProps extends IImgProps, IDivProps {
    imgSource: string;
    text: string;
    id: string;
}
interface IDivProps {
    top: number;
    left: number;
}
interface IImgProps {
    width: number;
    height: number;
}
interface ISet {
    main: IBoxProps;
    left: IBoxProps;
    right: IBoxProps;
}
export interface IBoxCompositionProps {
    data: ISet[];
}
export declare const BoxComposition: React.FC<IBoxCompositionProps>;
export {};
