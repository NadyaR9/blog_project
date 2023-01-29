
export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string,
  build: string,
  index: string,
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
}