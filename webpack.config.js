const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// var nodeExternals = require('webpack-node-externals');


const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        contentBase: false,
        host: '0.0.0.0',
        port: process.env.PORT || 8073
    },
    // Apparently, this is necessary to avoid the error "fs is not defined" when running "npm run build", idk why exactly and since when (and why) it is necessary. :\
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    // node: {
    //     'fs': 'empty',
    //     'es-errors': 'empty',
    //     'es-errors/type': 'empty',
    //     'type': 'empty'
    
    // },
    devtool: 'cheap-module-source-map',
    output: {
        library: 'VirtualMachine',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            // exclude: '/node_modules/',
            // resolve: {
            //     alias: {
            //         src: path.resolve(__dirname, 'src')
            //     },
            //     enforceExtension: false,
            //     symlinks: false
            // },
            // exclude: /node_modules/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            query: {
                // eslint-disable-next-line max-len
                // presets: [['@babel/preset-env', {targets: {browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']}}]]
                presets: [['@babel/preset-env']]
            }
            // ,
            // resolve: {
            //     fullySpecified: false
            // }
        },
        {
            test: /\.mp3$/,
            // exclude: /node_modules/,
            loader: 'file-loader',
            options: {
                outputPath: 'media/music/'
            }
        }
            // {
            //     test: /\.node$/,
            //     loader: 'node-loader',
            //     // include: path.resolve(__dirname, 'src')
            //     options: {
            //         outputPath: 'static/'
            //     }
            // }
            // ,
            // {
            //     test: /\.node$/,
            //     loader: 'node-loader'
            //     // config.module.rule('node').test(/\.node$/).use('node-loader').loader('node-loader').end()

        // }
        ]
    },
    // node: {
    //     __dirname: false
    // },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             include: /\.min\.js$/
    //         })
    //     ]
    // },
    plugins: [
        new CopyWebpackPlugin([{
           
                
            from: 'src/static',
            to: 'static'
                
            
        }])

    ]
};

module.exports = [
    // Web-compatible
    defaultsDeep({}, base, {
        target: 'web',
        // externals: [nodeExternals()], // ignore all modules in node_modules folder
        entry: {
            'scratch-vm': './src/index.js',
            'scratch-vm.min': './src/index.js'
        },
        output: {
            libraryTarget: 'umd',
            path: path.resolve('dist', 'web')
        },
        module: {
            rules: base.module.rules.concat([
                {
                    // exclude: '/node_modules/',
                    test: require.resolve('./src/index.js'),
                    loader: 'expose-loader?VirtualMachine'
                }
            ])
        }
    }),
    // Node-compatible
    defaultsDeep({}, base, {
        target: 'node',
        // externals: [nodeExternals()], // ignore all modules in node_modules folder
        // node: {
        //     __dirname: false
        // },
        // module: {
        //     rules: [
        //         {
        //             test: /\.node$/,
        //             loader: 'node-loader'
        //         }
        //     ]
        // },
        entry: {
            'scratch-vm': './src/index.js'
        },
        output: {
            libraryTarget: 'commonjs2',
            path: path.resolve('dist', 'node')
        },
        // externals: [nodeExternals()], // ignore all modules in node_modules folder
        // externals: ["fs"],
        externals:  {
            'decode-html': true,
            'format-message': true,
            'htmlparser2': true,
            'immutable': true,
            'jszip': true,
            'minilog': true,
            'nets': true,
            'scratch-parser': true,
            'socket.io-client': true,
            'text-encoding': true,
            // 'fs': true
        }
    }),
    // Playground
    defaultsDeep({}, base, {
        target: 'web',
        // externals: [nodeExternals()], // ignore all modules in node_modules folder
        entry: {
            'benchmark': './src/playground/benchmark',
            'video-sensing-extension-debug': './src/extensions/scratch3_video_sensing/debug'
        },
        // resolve: {
        //     extensions: ['.js', '.json', '.node']
        // },
        output: {
            path: path.resolve(__dirname, 'playground'),
            filename: '[name].js'
        },
        module: {
            rules: base.module.rules.concat([
                {
                    // exclude: '/node_modules/',

                    test: require.resolve('./src/index.js'),
                    loader: 'expose-loader?VirtualMachine'
                },
                {
                    // exclude: '/node_modules/',

                    test: require.resolve('./src/extensions/scratch3_video_sensing/debug.js'),
                    loader: 'expose-loader?Scratch3VideoSensingDebug'
                },
                {
                    // exclude: '/node_modules/',

                    test: require.resolve('stats.js/build/stats.min.js'),
                    loader: 'script-loader'
                },
                {
                    // exclude: '/node_modules/',
                    test: require.resolve('scratch-blocks/dist/vertical.js'),
                    loader: 'expose-loader?Blockly'
                },
                {
                    // exclude: '/node_modules/',
                    test: require.resolve('scratch-audio/src/index.js'),
                    loader: 'expose-loader?AudioEngine'
                },
                {
                    // exclude: '/node_modules/',
                    test: require.resolve('scratch-storage/src/index.js'),
                    loader: 'expose-loader?ScratchStorage'
                },
                {
                    // exclude: '/node_modules/',
                    test: require.resolve('scratch-render/src/index.js'),
                    loader: 'expose-loader?ScratchRender'
                }
            ])
        },
        performance: {
            hints: false
        },
        plugins: base.plugins.concat([
            new CopyWebpackPlugin([{
                from: 'node_modules/scratch-blocks/media',
                to: 'media'
            }, {
                from: 'node_modules/scratch-storage/dist/web'
            }, {
                from: 'node_modules/scratch-render/dist/web'
            }, {
                from: 'node_modules/scratch-svg-renderer/dist/web'
            }, {
                from: 'src/playground'
            }])
        ])
    })
];
