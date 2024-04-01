import { memo } from 'react';
import { ArticleBlockCode } from '../../model/types/article';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { Code } from '@/shared/ui/Code';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleBlockCode;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
      <HStack justify="center" max className={classNames('', {}, [className])}>
        <Code text={block.code} />
      </HStack>
    );
  },
);
