import { memo } from 'react';
import { ArticleBlockText } from '../../model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { Text } from '@/shared/ui/Text';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleBlockText;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.articleTextBlockComponent, {}, [className])}
      >
        {block?.title && <Text className={cls.title} title={block.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    );
  },
);
