const path = require('path');

const FontelloPlugin = require('fontello-webpack4-plugin');

module.exports = {
  runtimeCompiler: true,
  css: {
    modules: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        styles: path.resolve('src/sass'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
    plugins: [
      new FontelloPlugin({
        // eslint-disable-next-line global-require
        config: require('./fontello.config.json'),
        output: {
          css: 'css/ub-fontello.css',
          font: 'fonts/ub-fontello.[ext]',
        },
      }),
    ],
  },
  pluginOptions: {
    i18n: {
      locale: 'ru', // The locale of project localization
      fallbackLocale: 'ru', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false, // Enable locale messages in Single file components
    },
  },
};
/* eslint-enable */
