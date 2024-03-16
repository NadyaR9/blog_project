import { DropdownDirection } from 'shared/config/types/ui';
import cls from './popup.module.scss';

console.log('cls', cls);

export const mapDirection: Record<DropdownDirection, string> = {
  'bottom right': cls.optionsBottomRight,
  'bottom left': cls.optionsBottomLeft,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
};
