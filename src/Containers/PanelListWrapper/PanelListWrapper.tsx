import { MainInterface } from '@Utils/BaseStyles';
import React from 'react';
import styled from 'styled-components';
import {PanelCard,IPanelCardProps} from '../PanelCard/PanelCard';

export interface IPanelListWrapperProps extends MainInterface,React.HTMLAttributes<HTMLDivElement>{
    panels?:IPanelCardProps[];
    /** vertical space between panels in px */
    verticalSpacing?:number;
}

export const PanelListWrapper:React.FC<IPanelListWrapperProps>=({panels,verticalSpacing,...props})=><PanelListWrapperBox {...props}>
    {panels?.map((panel)=><PanelCard key={`${panel.name}`} {...panel} margin={`${verticalSpacing}px 0`} />)}
</PanelListWrapperBox>

const PanelListWrapperBox=styled.div<MainInterface>``
