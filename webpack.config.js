const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const jsFileTest = /\.jsx?$/;
const cssFileTest = /\.css$/;

const config = {
    context: __dirname,

    entry: ['react-hot-loader/patch', './js/index.jsx'],

    devtool: 'cheap-eval-source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },

    devServer: {
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    stats: {
        colors: true,
        reasons: true,
        chunks: false
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: jsFileTest,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },

            {
                test: jsFileTest,
                loader: 'babel-loader',
                include: [path.resolve('js')],
                query: {
                    retainLines: true
                }
            },

            {
                test: cssFileTest,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[hash:base64:5]-[name]__[local]'
                            }
                        },

                        {
                            loader: 'autoprefixer-loader',
                            options: {
                                browsers: 'last 2 version'
                            }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new CleanPlugin(['dist/**/*.*']),

        new CopyPlugin([
            { from: 'index.html' }
        ]),

        new ExtractTextPlugin('style.css', { allChunks: true })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.entry = './js/index.jsx';
    config.devtool = false;
    config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
