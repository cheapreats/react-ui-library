import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import {MainInterface} from '@Utils/BaseStyles';
import moment from 'moment';

moment.now();
const MINUTES_IN_YEAR = 524160;

export interface LimitedTimeBannerProps
    extends MainInterface {
        /* minutes until time runs out */ 
        minsRemaining: number,
    }

export const LimitedTimeBanner: React.FC<LimitedTimeBannerProps> = ({
    minsRemaining,
    ...props
}): React.ReactElement => (
    <BannerBox {...props}>
        <Icon />
            <BannerHeader>
                {alterTime(minsRemaining)} Remaining
            </BannerHeader>
    </BannerBox>
);

const BannerHeader = styled.header`
text-align:center;
line-height:40px;
font-size:25px;
text-transform: capitalize;
`;

/**
* Turns an amount of time in minutes to Hours, Days, Months or a Year
* Also checks if the time is to short (0 or less) or to long (more than a year) 
* @param {number} value - The time remaining in minutes  
* @returns {Strings} - The time remaining in a more concise and understandable form  
*/
const alterTime = (value:number)  => {
    if(value <= 0){
        return('No Time ')
    }
    if(value > MINUTES_IN_YEAR){
        return('Over A Year ')
    }
    return(moment.duration(value,'minutes').humanize());
}

const BannerBox = styled.div`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.background}};
    background-color:  ${theme.colors.bannerBackgroundColor};
    `}
    width:350px;
    height:40px;
`;

const Icon = styled(Clock)`
    width: 25px;
    float: left;
    padding-left: 5px;
    height: 40px;
`;
export default LimitedTimeBanner;