import { memo } from 'react';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { ArticleBlockImage } from '../../model/types/article';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextAligns } from '@/shared/ui/Text';

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
