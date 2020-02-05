const path = require('path');
const ExtractCSS = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE =path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');


const config = {
    entry: ['@babel/polyfill', ENTRY_FILE],
    output: {
        path: OUTPUT_DIR,
        filename: '[name].js'
    },
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: ExtractCSS.extract([
                    {
                        loader: 'css-loader'
                    },
                    // 호환성 추가
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [autoprefixer({browsers: 'cover 99.5%'})];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ])
            }
        ]
    },
    plugins: [new ExtractCSS('styles.css')]
};

module.exports = config;