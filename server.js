const path = require('path');
const chalk = require('chalk');
const express = require('express');
const argv = require('yargs').argv;

const app = express();

function setupWebpackDevelopmentServer(app) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/dev.config.js');

  const compiler = webpack(webpackConfig);

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    poll: true,
    quiet: false,
    reload: true,
  });

  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
    reload: true,
  });

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}

if (!argv.production) {
  setupWebpackDevelopmentServer(app);
}

const clientAssetsDir = path.join(__dirname, './dist');

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(clientAssetsDir));

app.listen(8080, err => {
  if (err) {
    return console.log(chalk.red.bold(err));
  }

  console.log(
    chalk.green.bold(
      '\n\n' +
        '##################################\n' +
        '### App listening on port 8080 ###\n' +
        '##################################'
    )
  );
});
