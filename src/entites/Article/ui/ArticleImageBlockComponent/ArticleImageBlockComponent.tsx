import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Text, TextAligns } from 'shared/ui';
import { ArticleBlockImage } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string,
  block: ArticleBlockImage,
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && (
        <Text
          text={block.title}
          align={TextAligns.CENTER}
        />
      )}
    </div>
  );
});
