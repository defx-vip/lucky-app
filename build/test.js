'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'test'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.test.conf')
const NoBug =   ["                        "
].join('\n')

console.log(chalk.keyword('orange').bold(NoBug))

// const spinner = ora('testBuilding for test...')
const spinner = ora('-> ')
spinner.start()




rm(path.join(config.testBuild.assetsRoot, config.testBuild.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during testBuild.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  testBuild failed with errors. Don\'t be discouraged and do it again!!!\n'))
      process.exit(1)
    }

    console.log(chalk.inverse.magenta('                    '))
    console.log(chalk.dim.yellow('                     '))
    console.log(chalk.inverse.blue('                       '))
    console.log(chalk.dim.green('                      '))
    console.log(chalk.inverse.red('                                   '))
    console.log(chalk.dim.black('                      '))
    console.log(chalk.inverse.blueBright('                                '))
    console.log(chalk.dim.redBright('                      '))
    console.log(chalk.inverse.magentaBright('                                        '))
    console.log(chalk.dim.greenBright('                 '))
    console.log(chalk.inverse.cyanBright('                                              '))
    console.log(chalk.dim.yellowBright('                   '))
    console.log(chalk.inverse.whiteBright('                                               '))
    console.log(chalk.dim.white('                     '))

    console.log(chalk.cyan('  testBuild complete.\n'))

    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    console.log(chalk.dim.green('             success             '))

  })
})
