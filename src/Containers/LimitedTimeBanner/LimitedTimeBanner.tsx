import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';
const hoursInDay = 24;
const hoursInWeek = 168;
const hoursInYear = 8736;
const pluralCheck = 1;
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
        case  (value >= hoursInDay && value < hoursInWeek) :
            value = Math.floor(value / hoursInDay);
            str = (value + ' Day');
                break;
        case (value >= hoursInWeek && value < hoursInYear):
            value = Math.floor(value / hoursInWeek);
            str = (value + ' Week');
                break;
        case (value >= hoursInYear):
            return ('Over A Year');
    }
    if(value > pluralCheck){
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
""
const Icon = styled(Clock)`
    width: 25px;
    float: left;
    padding-left: 5px;
    height: 40px;
`;
export default LimitedTimeBanner;