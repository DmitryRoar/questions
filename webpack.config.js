const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PORT = process.env.NODE_PORT || 3000

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const cssLoader = extract => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        },
    }, 'css-loader']

    if (extract) {
        loaders.push(extract)
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './app.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: PORT
    },
    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            minify: isProd
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoader()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoader('sass-loader')
            }
        ]
    }
}
