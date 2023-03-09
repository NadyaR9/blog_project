type Mods = Record<string, boolean | string>;

export const classNames = (general: string, mods: Mods = {}, additional: string[] = []) => [
  general,
  ...additional,
  ...Object.entries(mods)
    .filter(([className, value]) => Boolean(value))
    .map(([classNames, value]) => classNames),
].join(' ');
