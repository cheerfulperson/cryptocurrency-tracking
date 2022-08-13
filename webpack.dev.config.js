module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: process.env.HOST,
        historyApiFallback: true,
        port: process.env.PORT
    },
};
