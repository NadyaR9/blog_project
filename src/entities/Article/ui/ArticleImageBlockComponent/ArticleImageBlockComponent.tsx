import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleBlockImage } from '../../model/types/article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextAligns } from '@/shared/ui/deprecated/Text';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleBlockImage;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
      <VStack
        max
        align="center"
        gap="4"
        className={classNames('', {}, [className])}
      >
        <img src={block.src} alt={block.title} />
        {block.title && <Text text={block.title} align={TextAligns.CENTER} />}
      </VStack>
    );
  },
);
