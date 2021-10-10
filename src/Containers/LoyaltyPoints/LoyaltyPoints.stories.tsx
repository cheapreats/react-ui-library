import LoyaltyPoints from "./LoyaltyPoints";
import starimage from "../resources/blue-star-hi.png";


export default {
  component: LoyaltyPoints,
  title: 'LoyaltyPoints',
};

const LoyaltyPointsTemplate = args => <LoyaltyPoints {...args} />;

export const Default = LoyaltyPointsTemplate.bind({});
Default.args = {
  LoyaltyPoints: {
    amount: '+10',
    state: true,
    image: starimage,
    updatedAt: new Date(2021, 0, 1, 9, 0),
    
    
  },
};

//to do: implement feedback from meeting, refine ui