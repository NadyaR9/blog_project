import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg';
import ListIcon from '@/shared/assets/icons/redesigned/burger.svg';
import TiledIcon from '@/shared/assets/icons/redesigned/tile.svg';
import cls from './ArticleViewSelector.module.scss';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';
import { ToggleFeature, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewChange?: (newView: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      on: () => ListIcon,
      off: () => ListIconDeprecated,
      name: 'isAppRedesigned',
    }),
  },
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      on: () => TiledIcon,
      off: () => TiledIconDeprecated,
      name: 'isAppRedesigned',
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewChange } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewChange?.(newView);
  };

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <Card
          border="round"
          className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
            className,
          ])}
        >
          <HStack gap="8">
            {viewTypes.map((viewType) => (
              <Icon
                key={viewType.view}
                clickable
                onClick={onClick(viewType.view)}
                Svg={viewType.icon}
                className={classNames('', {
                  [cls.notSelected]: viewType.view !== view,
                })}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                Svg={viewType.icon}
                width={24}
                height={24}
                className={classNames('', {
                  [cls.notSelected]: viewType.view !== view,
                })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
