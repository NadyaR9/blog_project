import { memo } from 'react';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Text, TextAligns, VStack } from '@/shared/ui';
import { ArticleBlockImage } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string,
  block: ArticleBlockImage,
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;

  return (
    <VStack max align="center" gap="4" className={classNames('', {}, [className])}>
      <img src={block.src} alt={block.title} />
      {block.title && (
        <Text
          text={block.title}
          align={TextAligns.CENTER}
        />
      )}
    </VStack>
  );
});
