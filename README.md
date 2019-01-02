# CheaprEats React UI
React UI library for CheaprEats

## Usage

Create a Folder for the new component, use the consistent `export` terminology.

In `src/components/index.js` EXPORT your new component for use `export * from './YOUR_FOLDER/YOUR_COMPONENT_NAME';`

Then add the stories in `src/stories/YOUR_COMPONENT_NAME` and your done!

## Installation

To use this UI library, run the following command first:

```bash
$ npm install cheapreats-react-ui
```

Then you have to install `Quicksand` font, the easiest way is to include this tag in your HTML head:

```html
<link href="https://fonts.googleapis.com/css?family=Quicksand:400,700" rel="stylesheet">
```

## Installation From Github

If you've updated this libarary but haven't deployed it to NPM but still want to test it out in your production apps while waiting feel free to:
1) Add Your New Component
2) Run ```npm run build```
3) In the Application, install the Github Master Version: ```npm install https://github.com/CheaprEats/react-ui```
4) Import like: ```import { Button, FormInput, Heading1 }            from 'cheapreats-react-ui/dist/CheaprEatsStoryBook';```

## Documentation

Documentation of this library can be found at https://react-ui.cheapreats.com

## Contributing

To add a new component, create appropriate module within `components`, don't forget to add or update `index.js`!

You can add new stories within `stories` folder, and register them within `.storybook/config.js`.
