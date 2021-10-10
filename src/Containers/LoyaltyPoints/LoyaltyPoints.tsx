import React from 'react'; 
import styled from 'styled-components';

export default function LoyaltyPoints({ LoyaltyPoints: { amount, state, image }}) {
   if(state){
        return (
            <div class="PointBorder">
                <div className="list-item" >
                    <h1>{amount}</h1>
                    <img src={image} width="25" height="25" />
                </div>
            </div>
        );
   }
}
//to do: implement feedback from meeting, fix css to use styled components.