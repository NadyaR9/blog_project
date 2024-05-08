import { memo } from 'react';
import { ArticleBlockText } from '../../model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeature } from '@/shared/lib/features';

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
        {block?.title && (
          <ToggleFeature
            name="isAppRedesigned"
            on={<Text className={cls.title} title={block.title} />}
            off={<TextDeprecated className={cls.title} title={block.title} />}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeature
            name="isAppRedesigned"
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  },
);
