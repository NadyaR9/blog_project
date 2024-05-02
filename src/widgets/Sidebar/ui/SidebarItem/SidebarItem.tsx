import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ToggleFeature } from '@/shared/lib/features';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  if (item?.authOnly && !isAuth) {
    return null;
  }
  const { path, text } = item;

  return (
    <ToggleFeature
      name="isAppRedesigned"
      off={
        <AppLinkDeprecated
          to={path}
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>{t(text)}</span>
        </AppLinkDeprecated>
      }
      on={
        <AppLink
          to={path}
          className={classNames(cls.itemRedesigned, {
            [cls.collapsedRedesigned]: collapsed,
          })}
          activeClassname={cls.active}
        >
          <Icon Svg={item.Icon} />
          <span className={cls.link}>{t(text)}</span>
        </AppLink>
      }
    />
  );
});
