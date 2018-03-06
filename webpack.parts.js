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
