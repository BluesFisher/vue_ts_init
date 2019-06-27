const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',

    productionSourceMap: process.env.NODE_ENV !== 'production',
    lintOnSave: true,

    chainWebpack: config => {},
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
        } else {
            // 为开发环境修改配置...
            config.mode = 'development';
        }
        Object.assign(config, {
            // 开发生产共同配置
            // resolve: {
            //     alias: {
            //         assets: '@/assets',
            //         components: '@/components',
            //         views: '@/views',
            //         plugins: '@/plugins'
            //     }
            // }
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            warnings: false,
                            compress: {
                                drop_console: true, //console
                                drop_debugger: false,
                                pure_funcs: ['console.log'] //移除console
                            }
                        }
                    }),
                    new OptimizeCSSPlugin({
                        cssProcessorOptions: process.env.NODE_ENV !== 'production' ? { safe: true, map: { inline: false } } : { safe: true }
                    })
                ]
            }
        });
    },
    // 生产环境是否生成 sourceMap 文件
    // productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        // host: '0.0.0.0',
        // port: 8080,
        // https: false,
        // hotOnly: false,
        // proxy: {
        //     // 设置代理
        //     // proxy all requests starting with /api to jsonplaceholder
        //     'http://localhost:8080/': {
        //         target: 'http://baidu.com:8080', //真实请求的目标地址
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^http://localhost:8080/': ''
        //         }
        //     }
        // },
        // before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/assets/css/common.less')]
        }
    }
};
