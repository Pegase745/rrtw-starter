const path = require('path');
const chalk = require('chalk');
const express = require('express');
const argv = require('yargs').argv;

const app = express();

if (!argv.production) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackConfigPath = `./webpack/${argv.production ? 'prod' : 'dev'}.config.js`;
    const webpackConfig = require(webpackConfigPath);

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }));

    app.use(webpackHotMiddleware(compiler));
} else {
    const clientAssetsDir = path.join(__dirname, './dist');

    app.use(express.static(clientAssetsDir));
}

app.listen(8080, (err) => {
    if (err) {
        return console.log(chalk.red.bold(err));
    }

    console.log(chalk.green.bold(
        '\n\n' +
        '##################################\n' +
        '### App listening on port 8080 ###\n' +
        '##################################'
    ));
});
