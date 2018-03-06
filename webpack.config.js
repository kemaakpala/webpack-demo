const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');
const parts = require('./webpack.parts');

const commonConfig = merge([
    {
        plugins: [
            // Ignore node_modules so CPU usage with poll watching drops significantly.
            new HtmlWebpackPlugin({title: "Webpack demo"})
        ]
    }
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    parts.devServer({
        //Customize host/part here if needed
        host: process.env.HOST,
        port: process.env.PORT
    })
]);

module.exports = mode => {
    if(mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};