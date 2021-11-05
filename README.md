# CheaprEats UI Library

## PR Requirements
- Showcase Visual Layer through an Image on your Pull Request
- Showcase Interactions / Animations Layer through a GIF / Video on your Pull Request
  - Macbook: Command+Shift+5
  - Windows: Snip Tool

## Installation Requirements

**Prettier:** https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## *Getting Started*

**Storybook:** https://storybook.js.org/

**TypeScript:** https://www.typescriptlang.org/

**Atomic Design:** https://atomicdesign.bradfrost.com/

This repository encompasses the [Component Driven Design Methodology](https://medium.com/the-s-curve/why-component-driven-design-drives-great-software-products-7cace364e815).

## src/
This folder is where you will be building your UI, no-data-logic only components.

## stories/
This folder is where you will be testing your UI on Storybook for different ViewPorts (Responsiveness), Accessibility and functionality.

## .storybook/
This folder contains the Storybook configuration options

## scripts/
This folder contains code generation scripts to help make development faster.

### Helpful Resources
#### Need Icons
Use the Styled-Icons library to import icons from : https://styled-icons.dev/
#### Themes/ 
Contains all the styling that CheaprEats uses so you don't have to guess to color codes, Also your components will automatically translate to dark mode!
##### Mixins (Responsiveness)
- Ensure that you are using the consistent Mixins for your Media Queries: https://github.com/cheapreats/react-ui-library/blob/v2/src/Themes/ThemeTemplate.ts#L138
