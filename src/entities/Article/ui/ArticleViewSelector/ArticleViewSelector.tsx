import { memo } from 'react';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tiled.svg';
import { Button, Icon } from '@/shared/ui';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/consts/consts';

interface ArticleViewSelectorProps {
  className?: string,
  view?: ArticleView,
  onViewChange?: (newView: ArticleView) => void,
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewChange } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewChange?.(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          onClick={onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames('', { [cls.notSelected]: viewType.view !== view })}
          />
        </Button>
      ))}
    </div>
  );
});
