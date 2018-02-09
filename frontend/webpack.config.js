const path = require('path');
module.exports = {
    entry: ['babel-polyfill', './client/index.js'],
    resolve: { extensions: ['.js', '.jsx', '.json']},
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www')
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-decorators-legacy', 'transform-class-properties'],
                    }
                }
            }
        ]
    },
    
};