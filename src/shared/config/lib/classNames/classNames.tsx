export type Mods = Record<string, boolean | string | undefined>;

export const classNames = (
  general: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string => [
  general,
  ...additional,
  ...Object.entries(mods)
    .filter(([className, value]) => Boolean(value))
    .map(([classNames, value]) => classNames),
].join(' ');
