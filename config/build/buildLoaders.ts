import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export default function buildLoaders({ isDev, paths }: BuildOptions): RuleSetRule[] {
  const babelLoader = {
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env'],
        ],
      },
    },
  };
  const stylesLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:5]',
          },
        },
      },
      'sass-loader',
    ],
  };
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

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  return [
    svgLoader,
    stylesLoader,
    babelLoader,
    typescriptLoader,
    fileLoader,
  ];
}
