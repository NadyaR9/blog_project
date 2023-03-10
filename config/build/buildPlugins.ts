import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DefinePlugin, WebpackPluginInstance, ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export default function buildPlugins({ paths, isDev }: BuildOptions): WebpackPluginInstance[] {
  const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({ template: paths.index }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new DefinePlugin({
      __DEV__: JSON.stringify(isDev),
    }),
    new ProgressPlugin(),
  ];

  if (isDev) {
    plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));
  }
  return plugins;
}
