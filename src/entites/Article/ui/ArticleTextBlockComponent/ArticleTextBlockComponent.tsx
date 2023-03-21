import { ArticleBlockText } from 'entites/Article/model/types/article';
import { memo } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Text } from 'shared/ui';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string,
  block: ArticleBlockText,
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.articleTextBlockComponent, {}, [className])}>
      {block?.title && (
        <Text
          className={cls.title}
          title={block.title}
        />
      )}
      {block.paragraphs.map((paragraph) => <Text key={paragraph} text={paragraph} className={cls.paragraph} />)}
    </div>
  );
});
