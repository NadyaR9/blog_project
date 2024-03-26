import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';

export default function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options;
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const stylesLoader = buildCssLoader(isDev);
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = buildSvgLoader();

  return [
    svgLoader,
    tsxCodeBabelLoader,
    codeBabelLoader,
    typescriptLoader,
    fileLoader,
    stylesLoader,
  ];
}
