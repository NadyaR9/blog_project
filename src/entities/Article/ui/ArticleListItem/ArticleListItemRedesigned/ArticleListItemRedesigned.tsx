import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/redesigned/Eye.svg';

import { getRouteArticleDdetails } from '@/shared/const/router';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleBlockText } from '../../../model/types/article';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target = '_self' } = props;
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(getRouteArticleDdetails(article.id));
  }, [article.id, navigate]);

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text className={cls.views} text={String(article.views)} />
    </HStack>
  );

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold className={cls.username} text={article.user.username} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleBlockText;
    return (
      <Card
        padding="24"
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        data-testid="ArticleListItem"
      >
        <VStack gap="16">
          <HStack max gap="8">
            {userInfo}
            <Text className={cls.date} text={article.createdAt} />
          </HStack>
          <Text bold title={article.title} />
          <Text title={article.subtitle} size="s" />
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            fallback={<Skeleton width="100%" height={250} />}
          />
          {textBlock && (
            <Text
              text={textBlock.paragraphs.slice(0, 3).join(' ')}
              className={cls.textBlock}
            />
          )}
          <HStack max justify="between">
            <AppLink to={getRouteArticleDdetails(article.id)} target={target}>
              <Button variants="outline">{t('Read more')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }
  return (
    <AppLink
      to={getRouteArticleDdetails(article.id)}
      target={target}
      data-testid="ArticleListItem"
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card
        onClick={onOpenArticle}
        className={cls.card}
        border="round"
        padding="0"
      >
        <AppImage
          className={cls.img}
          src={article.img}
          alt={article.title}
          fallback={<Skeleton width="100%" height={200} />}
        />
        <VStack gap="4" className={cls.info}>
          <Text className={cls.title} text={article.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text className={cls.date} text={article.createdAt} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
