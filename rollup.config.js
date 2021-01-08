import tsPlugin from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript'
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: './dist',
            format: 'esm',
        }
    ],
    plugins: [
        tsPlugin({ typescript: ttypescript, tsconfigOverride: { compilerOptions : { module: "es2015" } }, tsconfigDefaults: {
            compilerOptions: {
                plugins: [
                    { "transform": "@zerollup/ts-transform-paths" }
                ]
            }
        } }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.ts', '.tsx'],
            plugins: ['babel-plugin-styled-components', 'babel-plugin-transform-class-properties'],
            presets: ['@babel/preset-env', '@babel/preset-react','@babel/preset-typescript']
        }),
        css({output: 'bundle.css'}),
        commonjs(),
        json(),
        nodeResolve({preferBuiltins: false}),
    ],
    external: ['react', 'react-dom']
}