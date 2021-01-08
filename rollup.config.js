import typescript from 'rollup-plugin-typescript2';
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from './package.json';


// include: [ "*.ts+(|x)", "**/*.ts+(|x)" ], 
// useTsconfigDeclarationDir: false - emitted in directory given in tsconfig
export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false
        }
    ],
    plugins: [
        typescript({ tsconfig: './tsconfig.json', tsconfigOverride: { compilerOptions : { module: "es2015" } } }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.ts', '.tsx'],
            plugins: ['babel-plugin-styled-components', 'babel-plugin-transform-class-properties'],
            presets: ['@babel/preset-env', '@babel/preset-react','@babel/preset-typescript']
        }),
        commonjs()
    ],
    external: ['react', 'react-dom']
}