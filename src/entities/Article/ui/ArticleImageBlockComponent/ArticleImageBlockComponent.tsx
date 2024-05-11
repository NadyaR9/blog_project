import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleBlockImage } from '../../model/types/article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
  Text as TextDeprecated,
  TextAligns,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeature } from '@/shared/lib/features';

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
        {block.title && (
          <ToggleFeature
            name="isAppRedesigned"
            on={<Text text={block.title} align="center" />}
            off={
              <TextDeprecated text={block.title} align={TextAligns.CENTER} />
            }
          />
        )}
      </VStack>
    );
  },
);
