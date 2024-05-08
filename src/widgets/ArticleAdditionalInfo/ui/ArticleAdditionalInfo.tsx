import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleAdditionalInfo.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { User } from '@/entities/User';

interface ArticleAdditionalInfoProps {
  className?: string;
  views: number;
  author: User;
  createdAt: string;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, views, author, createdAt } = props;
    const { t } = useTranslation();

    return (
      <VStack
        className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
        gap="32"
      >
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        <Button>{t('Edit')}</Button>
        <Text text={t('{{count}} view', { count: views })} />
      </VStack>
    );
  },
);
