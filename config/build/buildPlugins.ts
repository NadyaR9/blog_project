import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  DefinePlugin, WebpackPluginInstance, ProgressPlugin, HotModuleReplacementPlugin,
} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { BuildOptions } from './types/config';

export default function buildPlugins({
  paths, isDev, apiUrl, project,
}: BuildOptions): WebpackPluginInstance[] {
  const isProd = !isDev;

  const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({ template: paths.index }),
    new DefinePlugin({
      __DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new HotModuleReplacementPlugin());
    plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }));
    plugins.push(new CopyPlugin({
      patterns: [
        { from: paths.locales, to: paths.buildLocales },
      ],
    }));
  }
  return plugins;
}
