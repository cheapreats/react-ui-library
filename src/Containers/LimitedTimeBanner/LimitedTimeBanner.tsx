import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';

const BannerBox = styled.div`
    // Theme Stuff
    ${({theme, ...props}):string => `
    font-family: ${theme.font.family};
    background-color: rgba(0,0,0,0.5);
    color: ${theme.colors.background}};
    width: 250px;
    height: 25px; 
    text-align: center;
    font-size: 14;
    `}

`;

export interface IconProps {}
const Icon = styled(Clock)<IconProps>`
    width: 20px;
    float: left;
    margin-bottom: auto;
    margin-top: auto;
`;

export interface LimitedTimeBannerProps
    extends MainInterface {
        HoursRemaining: string;
}

export const LimitedTimeBanner: React.FC<LimitedTimeBannerProps> = ({
    HoursRemaining,...props
}): React.ReactElement => {
    return (
        <BannerBox {...props}>
            <Icon></Icon><p>{HoursRemaining}</p>
       
        </BannerBox>
    ) ;
};


export default LimitedTimeBanner;