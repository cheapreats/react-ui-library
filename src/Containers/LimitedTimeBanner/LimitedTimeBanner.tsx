import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';
import moment from 'moment';

console.log(moment.now());
const MINUTES_IN_YEAR = 524160;

/* Only importing the remaining time as a number  */
export interface LimitedTimeBannerProps
    extends MainInterface {
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
* @param value minsRemaining 
* @returns Return Minutes as Hours, Days, Months, Year 
* Also Returns if there is no time or if the time is over a year
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