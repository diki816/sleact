import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fort-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

//process.env는 node런타입(서버) 에서만 사용 가능하나 webpack.EnvironmentPlugin 통하여 여기서도 사용가능하게 함
const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
    name: 'sleact',
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: { //tsconfig.json에서는 타이핑 상의 Validation 일 때 사용하고, 여기서는 js로 변경할 때 사용
            '@hooks': path.resolve(__dirname, 'hooks'),
            '@components': path.resolve(__dirname, 'components'),
            '@layouts': path.resolve(__dirname, 'layouts'),
            '@pages': path.resolve(__dirname, 'pages'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@typings': path.resolve(__dirname, 'typings'),
        },
    },
    entry: {
        app: './client',
    }, 
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: { browsers: ['last 2 chrome versions']},
                                debug: isDevelopment,
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    /*
                    env: {
                        development: {
                            plugins: [['emotion', { sourceMap: true }], require.resolve('react-refresch/babel')],
                        },
                        production: {
                            plugins: ['emotion'],
                        },
                    },
                    */
                    exclude: path.join(__dirname, 'node_modules'),
                },
                
                {
                    test: /\.css?$/,
                    use: ['style-loader', 'css-loader'],
                },
        ],
        
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new webpack.EnvironmentPlugin({ NODE_DEV: isDevelopment? 'development' : 'production' }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    devServer: {
        historyApiFallback: true,
        port: 3090,
        publicPath: '/dist',
        proxy: {
             '/api/': {
                 target: 'http://localhost:309',
                 changeOrigin: true,
             },
        },
    },
};

if (isDevelopment && config.plugins) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false}));
}
if (!isDevelopment && config.plugins) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({minimize: true}));
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;