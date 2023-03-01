export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string,
  build: string,
  index: string,
  src: string,
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
  port: number,
}

export interface EnvVariables {
  port: number,
  mode: BuildMode,
}
