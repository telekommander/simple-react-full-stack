const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDir = '../dist';

module.exports = env => {

    return {
        mode: (env.production) ? 'production' : 'development',
        devtool: (env.production) ? 'none' : 'inline-source-map',
        entry: ['babel-polyfill', './src/client/index.js'],
        output: {
            path: path.join(__dirname, buildDir),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    (env === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.scss']
        },
        devServer: {
            port: 3000,
            open: false,
            proxy: {
                '/api': 'http://localhost:8080'
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico'
            })
        ]
    };
};
