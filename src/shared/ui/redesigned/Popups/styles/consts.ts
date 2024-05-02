import { DropdownDirection } from '@/shared/config/types/ui';
import cls from './popup.module.scss';

export const mapDirection: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
};
