import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: 'development',
    entry: './.instrumented/client/index.tsx',
    output: {
        filename: 'webapp.js',
        path: path.resolve(__dirname, '.build'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
