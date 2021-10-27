import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';

const BannerBox = styled.div`
    // Theme Stuff
    ${({theme, ...props}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.background}};

    `}
    background-color: rgba(0,0,0,0.5);
    text-align: center;
    width: 250px;
    height: 22px; 
    line-height:25px
    font-size: 12;
`;

const Icon = styled(Clock)`
    width: 18px;
    float: left;
    padding-top:2.5px;
    padding-bottom:2.5px;
    padding-left: 2.5px;
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
            <Icon />
                <p>{HoursRemaining}</p>
       
        </BannerBox>
    ) ;
};

export default LimitedTimeBanner;