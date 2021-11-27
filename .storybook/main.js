module.exports = {
  "core": {
    "builder": 'webpack5',
  },
  "framework": '@storybook/react',
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss"
  ],
  "features": {
    "babelModeV7": true,
    "storyStoreV7": true,
  },
  "webpackFinal": config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        modules: ["../src", ...config.resolve.modules],
        fallback: { 
          "stream": require.resolve("stream-browserify"), 
          ...config.resolve.fallback 
        }
      }
    }
  }
}