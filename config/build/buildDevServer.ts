import { BuildOptions } from "./types/config";
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export default function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const { port } = options;
  return {
    open: true,
    port,
    historyApiFallback: true,
  }
}