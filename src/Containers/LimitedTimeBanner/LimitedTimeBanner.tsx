import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';
const HOURS_IN_DAY = 24;
const HOURS_IN_WEEK = 168;
const HOURS_IN_YEAR = 8736;
const PLURAL_CHECK = 1;

export interface LimitedTimeBannerProps
    extends MainInterface {
        hoursRemaining: number,
}

export const LimitedTimeBanner: React.FC<LimitedTimeBannerProps> = ({
    hoursRemaining,...props
}): React.ReactElement => (
    <BannerBox {...props}>
        <Icon />
            <p>
                {alterTime(hoursRemaining)} Remaining
            </p>
    </BannerBox>
);

const alterTime = (value:number)  => {
    let str = (value+' Hour');
    switch ( true )
    {
        case (value < 1):
            return ('Under 1 Hour');
        case  (value >= HOURS_IN_DAY && value < HOURS_IN_WEEK) :
            value = Math.floor(value / HOURS_IN_DAY);
            str = (value + ' Day');
                break;
        case (value >= HOURS_IN_WEEK && value < HOURS_IN_YEAR):
            value = Math.floor(value / HOURS_IN_WEEK);
            str = (value + ' Week');
                break;
        case (value >= HOURS_IN_YEAR):
            return ('Over A Year');
    }
    if(value > PLURAL_CHECK){
        str += 's';
    }
    return(str);
}

const BannerBox = styled.div`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.background}};
    background-color:  ${theme.colors.bannerBackgroundColor};
    `}
    text-align:center;
    line-height:40px;
    width:350px;
    height:40px;
    font-size:25px;
`;

const Icon = styled(Clock)`
    width: 25px;
    float: left;
    padding-left: 5px;
    height: 40px;
`;
export default LimitedTimeBanner;