import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';

export interface LimitedTimeBannerProps
    extends MainInterface {
        hoursRemaining: number,
}

export const LimitedTimeBanner: React.FC<LimitedTimeBannerProps> = ({
    hoursRemaining,...props
}): React.ReactElement => (
    <BannerBox {...props}>
        <Icon />
        <p>{alterTime(hoursRemaining)} Remaining</p>
    </BannerBox>
) ;
const alterTime = (value:number)  => {
    if(value < 1){
        return ('< 1 Hour');
    }
    if(value == 1){
        return ('1 Hour');
    }
    let str = (value+' Hour');
    if(value >= 24){
        if(value >= 168){
            if(value >= 8736){
                return ('>1 Year');
            }
            value = Math.floor(value / 168) % 60;
            str = (value + ' Week');
        }else{
            value = Math.floor(value / 24) % 60;
            str = (value + ' Day');
        }
    }
    if(value>1){
        str = str +'s';
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