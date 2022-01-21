const path = require('path');

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name:"@cheapreats/react-ui",
            type: 'umd',
        },
    },
    resolve: {
        alias: {
            '@Layouts/*': path.resolve(__dirname, 'src/Layouts/*'),
            '@Layouts': path.resolve(__dirname, 'src/Layouts/'),
            "@Containers/*": path.resolve(__dirname, 'src/Containers/*'),
            "@Containers": path.resolve(__dirname, 'src/Containers/'),
            "@Overview/*": path.resolve(__dirname, 'src/Overview/*'),
            "@Overview": path.resolve(__dirname, 'src/Overview/'),
            "@Inputs/*": path.resolve(__dirname, 'src/Inputs/*'),
            "@Inputs": path.resolve(__dirname, 'src/Inputs/'),
            "@Text/*": path.resolve(__dirname, 'src/Text/*'),
            "@Text": path.resolve(__dirname, 'src/Text/'),
            "@Themes/*": path.resolve(__dirname, 'src/Themes/*'),
            "@Themes": path.resolve(__dirname, 'src/Themes/'),
            "@Utils/*": path.resolve(__dirname, 'src/Utils/*'),
            "@Utils": path.resolve(__dirname, 'src/Utils/')
        },
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { 
                test: /\.tsx?$/, 
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }
};