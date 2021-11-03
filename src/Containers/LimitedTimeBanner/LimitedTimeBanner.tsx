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
        <p>{hoursRemaining} Remaining</p>
    </BannerBox>
) ;
const alterTime = (value:number)  => {
    let newValue = value;
    if(value <= 1){
        return ('> ' + value) as string;
    }
    if(value >= 24){
        newValue = Math.floor(value / 24) % 60;
        value -= newValue * 24;
        if(newValue>100){
            return ('100 days +');
        }
        return (newValue + 'Days and '+ value + ' Hours')as string;
    }
    var str = value.toString();
    return(str+' Hours');
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