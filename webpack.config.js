module.exports = {
    entry: {
        presenter: './src/presenter.ts',
        audience: './src/audience.ts',
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' },
        ],
    },
};
