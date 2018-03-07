const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');
// const babelPluginAnnotateConsoleLog =
// require('babel-plugin-annotate-console-log');
const glob = require("glob");
const parts = require('./webpack.parts');

const PATHS = {
    app: path.resolve(__dirname, "./src")
};

const commonConfig = merge([
    parts.polyFillJavaScript({appPath: PATHS.app}),
    parts.loadFonts({
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        options: {
            limit: 50000,
            mimetype: "application/font-woff",
            name: "./fonts/[name].[ext]"
        }
    }),
    parts.loadJavaScript({include: PATHS.app}), {
        plugins: [new HtmlWebpackPlugin({title: "Webpack demo"})]
    }
]);

const productionConfig = merge([
    //parts.extractCSS({use: "css-loader"}),
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "all"
                    }
                }
            }
        }
    },
    parts.extractCSS({
        use: [
            "css-loader", parts.autoprefix()
        ]
    }),
    //CSS EXTRACTION MUST HAPPEN BEFORE PURIFYING
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true})
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: "[name].[ext]"
        }
    }),
    parts.loadImageFiles({
        options: {
            name: "[path][name].[hash].[ext]"
        }
    }),
    parts.generateSoureMaps({type: "source-map"})
]);

const developmentConfig = merge([
    parts.loadCSS(),
    parts.devServer({
        //Customize host/part here if needed
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadImages()
]);

module.exports = mode => {
    process.env.Babel_ENV = mode;
    return ((mode === "production")
        ? merge(commonConfig, productionConfig, {mode})
        : merge(commonConfig, developmentConfig, {mode}));

};