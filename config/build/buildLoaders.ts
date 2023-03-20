import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';

export default function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options;
  const babelLoader = buildBabelLoader(options);
  const stylesLoader = buildCssLoader(isDev);
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = buildSvgLoader();

  return [
    svgLoader,
    babelLoader,
    typescriptLoader,
    fileLoader,
    stylesLoader,
  ];
}
