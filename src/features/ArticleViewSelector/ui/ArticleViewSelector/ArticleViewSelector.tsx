import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tiled.svg';
import cls from './ArticleViewSelector.module.scss';
import { Button } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewChange?: (newView: ArticleView) => void;
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
        <Button key={viewType.view} onClick={onClick(viewType.view)}>
          <Icon
            Svg={viewType.icon}
            width={24}
            height={24}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
});
