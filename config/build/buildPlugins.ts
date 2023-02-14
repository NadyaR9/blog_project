import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DefinePlugin, WebpackPluginInstance, ProgressPlugin } from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export default function buildPlugins({ paths, isDev }: BuildOptions): WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({ template: paths.index }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new DefinePlugin({
      __DEV__: isDev,
    }),
  ];
}
