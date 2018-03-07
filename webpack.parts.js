const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

exports.devServer = ({host, port} = {}) => ({
    devServer: {
        // Display only errors to reduce the amount of output.
        stats: "errors-only",
        // Parse host and port from env to allow customization.
        //
        // 0.0.0.0 is available to all network devices unlike default 'localhost'
        host, //Default to localhost
        port, //Defaults to 8080
        //overlay: true is equivalent
        overlay: {
            errors: true,
            warnings: true
        }
    }
});

exports.loadCSS = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ["style-loader", "css-loader"] //, "less-loader", "sass-loader"]
            }
        ]
    }
});

exports.extractCSS = ({include, exclude, use}) => {
    //Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        //allChunks is needed to extract from extracted chunks as well
        allChunks: true,
        filename: "[name].css"
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: plugin.extract({use, fallback: 'style-loader'})
                }
            ]
        },
        plugins: [plugin]
    }
};

exports.purifyCSS = ({paths}) => ({
    plugins: [new PurifyCSSPlugin({paths})]
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()]
    }
})

exports.loadImages = ({include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,
                use: {
                    loader: 'url-loader',
                    options
                }
            }
        ]
    }
});

exports.loadImageFiles = ({include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,
                use: {
                    loader: 'file-loader',
                    options
                }
            }
        ]
    }

});

exports.loadFonts = ({test = /\.woff$/, include, exclude, options}={})=>({
    module: {
        rules: [
            {
                test,
                include,
                exclude,
                use: {
                  loader: "url-loader",
                  options
                }
            }
        ]
    }

});

exports.loadJavaScript = ({include, exclude})=>({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader"
            }
        ]
    }
})

exports.polyFillJavaScript = ({appPath}={})=>({
    entry: ["babel-polyfill", appPath]
})