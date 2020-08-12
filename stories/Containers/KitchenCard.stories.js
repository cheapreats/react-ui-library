import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { KitchenCard} from '../../src';

const sampleOrder = {
    "_id": "5f15ff0d1689a01c4b9cc72f",
    "status": "preparing",
    "items": [
      {
        "name": "Cool Sandwich",
        "_id": "5e8a23d1b0bd74723d927706",
      },
      {
        "name": "This is a very long Sandwich Name",
        "_id": "5e8a23d1b0bd74723d927706",
      }
    ],
    "customer": {
      "name": "Ralph Maamari"
    },
    "order_type": "EAT_IN",
}
const sampleOrderMany = {
    "_id": "5f15ff0d1689a01c4b9cc72f",
    "status": "preparing",
    "items": [
      {
        "name": "Cool Sandwich",
        "_id": "5e8a23d1b0bd74723d927706",
      },
      {
        "name": "This is a very long Sandwich Name",
        "_id": "5e8a23d1b0bd74723d927706",
      },
      {
        "name": "Cool Sandwich",
        "_id": "5e8a23d1b0bd74723d927706",
      },
      {
        "name": "This is a very long Sandwich Name",
        "_id": "5e8a23d1b0bd74723d927706",
      },
      {
        "name": "Cool Sandwich",
        "_id": "5e8a23d1b0bd74723d927706",
      },
      {
        "name": "This is a very long Sandwich Name",
        "_id": "5e8a23d1b0bd74723d927706",
      }
    ],
    "customer": {
      "name": "Ralph Maamari"
    },
    "order_type": "EAT_IN",
}


storiesOf('KitchenCard', module)
.addDecorator(withKnobs)
    .add('with default', () => (
        <KitchenCard  
            cardWidth={number('Width', 230)}
            cardMargin={number('Margin', 10)}
            cardHeight={text('Height in px',400)}   
            modifiers={ [["Add Lettuce", "Mayo"], ["No Ketchup", "Add Bacon"]]}
            isFullName={boolean('displayFullName', false)}
            TimeComponent={text('Time',"10:00")}
            {...sampleOrder}
        />
    ))
    .add('Disable FullName', ()=>(
        <KitchenCard  
            cardWidth={number('Width', 230)}
            cardMargin={number('Margin', 10)}
            cardHeight={text('Height in px',400)}   
            modifiers={ [["Add Lettuce", "Mayo", "Add Olives"], ["No Ketchup", "Add Bacon"]]}
            isFullName={boolean('displayFullName', true)}
            TimeComponent={text('Time',"10:00")}
            {...sampleOrder}
        />
    ))
    .add('Many Items', ()=>(
        <KitchenCard  
            cardWidth={number('Width', 230)}
            cardMargin={number('Margin', 10)}
            cardHeight={text('Height in px',400)}    
            modifiers={ [["Add Lettuce", "Mayo"], ["No Ketchup", "Add Bacon", "Add Olives"], [], ["Add Lettuce"], [], ["No Ketchup"], []]}
            isFullName={boolean('displayFullName', true)}
            TimeComponent={text('Time',"10:00")}
            {...sampleOrderMany}
        />
    ))