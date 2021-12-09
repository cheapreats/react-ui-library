import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import tsPlugin from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            name: '@cheapreats/react-ui',
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        },
    ],
    plugins: [
        peerDepsExternal(),
        copy({
            targets: [
                { src: 'src/Containers/FileUpload/worker.js', dest: 'dist' },
            ],
        }),
        commonjs(),
        json({
            exclude: [
                '*.d.ts',
                '**/*.d.ts',
                'node_modules/**',
                '__tests__',
                '.vscode',
                '.github',
                'scripts',
                'dist', 
                'storybook-static', 
            ]
        }),
        tsPlugin({
            useTsconfigDeclarationDir: true,
            typescript: ttypescript,
            tsconfig: './tsconfig.json',
            include: ['*.ts+(|x)', '**/*.ts+(|x)'],
            exclude: [
                '*.d.ts',
                '**/*.d.ts',
                'node_modules/**',
                '__tests__',
                '.vscode',
                '.github',
                'scripts',
                'dist', 
                'storybook-static', 
            ],
            tsconfigOverride: { compilerOptions: { module: 'es2015' } },
            tsconfigDefaults: {
                compilerOptions: {
                    plugins: [{ transform: '@zerollup/ts-transform-paths' }],
                },
            },
        }),
        nodeResolve({ preferBuiltins: true}),
        babel({
            exclude: ['node_modules', 'scripts', 'dist', '*.d.ts', '**/*.d.ts', 'storybook-static', '.vscode', '.github', '__tests__'],
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            plugins: [
                'babel-plugin-styled-components',
                'babel-plugin-transform-class-properties',
            ],
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            babelHelpers: 'bundled',
        }),
        postcss({
            extensions: ['.css'],
        }),
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'workerize-loader',
        "react",
        "react-dom"
    ],
};