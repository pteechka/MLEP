const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
            {from: `${baseWebpackConfig.externals.paths.src}/fonts/`, to: `${baseWebpackConfig.externals.paths.assets}fonts/`}
            ]
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})