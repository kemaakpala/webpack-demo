const webpack = require("webpack");
const PATHS = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');
const glob = require("glob");
const parts = require('./webpack.parts');

const commonConfig = merge([
    {
        plugins: [new HtmlWebpackPlugin({title: "Webpack demo"})]
    }
]);

const productionConfig = merge([
    //parts.extractCSS({use: "css-loader"}),
    parts.extractCSS({use: ["css-loader", parts.autoprefix()]}),
    //CSS EXTRACTION MUST HAPPEN BEFORE PURIFYING
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true})
    })
]);

const developmentConfig = merge([
    parts.loadCSS(),
    parts.devServer({
        //Customize host/part here if needed
        host: process.env.HOST,
        port: process.env.PORT
    })
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, {mode});
    }

    return merge(commonConfig, developmentConfig, {mode});
};