import { memo } from 'react';
import { ArticleBlockCode } from '@/entites/Article/model/types/article';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Code, HStack } from '@/shared/ui';

interface ArticleCodeBlockComponentProps {
  className?: string,
  block: ArticleBlockCode,
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;

  return (
    <HStack justify="center" max className={classNames('', {}, [className])}>
      <Code text={block.code} />
    </HStack>
  );
});
