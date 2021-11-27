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

# When Importing/Using This Library
- Ensure there is only one instance of react & react-dom being used in your app. Use Webpack alias to point to ./node_modules/react & ./node_modules/react-dom respectively.
When you import this library there is the Version of React by the Library and the version of React by your app being used simutaneously. Even if they are the same versions, two copies of react/react-dom will cause issues. Point all instance of react/react-dom to the one used by your application using Webpack Aliases.
  resolve: {
    alias: {
      // add as many aliases as you like! 
      react: "./node_modules/react",
      "react-dom": "./node_modules/react-dom"
    }
  }
- Wrap you app with the Theme Object
You need to import Global into your app and wrap your app with the Global to Access the Theme.
    return (
        <Global
            extend={
                JSON.parse(localStorage.getItem('isDark') ?? 'false')
                    ? extendThemeDark
                    : extendThemeMain
            }
            style={globalStyle}
            theme={ThemeTypes.MAIN}
        >
            <QueryClientProvider client={queryClient}>
                <Switch>
                    {getLandingRoutes()}
                    <Route path="/:id" component={Dashboard} />
                </Switch>
            </QueryClientProvider>
        </Global>
    );
