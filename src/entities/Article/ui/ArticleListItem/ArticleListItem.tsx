import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { useHover } from '@/shared/config/lib/hooks/useHover/useHover';
import { Article, ArticleBlockText } from '../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleListItem.module.scss';
import { getRouteArticleDdetails } from '@/shared/const/router';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ButtonVariants } from '@/shared/ui/Button';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleListItemProps {
  className?: string,
  article: Article,
  view: ArticleView,
  target?: HTMLAttributeAnchorTarget,
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target = '_self',
  } = props;
  const [isHover, bindHover] = useHover();
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(getRouteArticleDdetails(article.id));
  }, [article.id, navigate]);

  const types = <Text className={cls.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={cls.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleBlockText;
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cls.username} text={article.user.username} />
            <Text className={cls.date} text={article.createdAt} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            fallback={<Skeleton width="100%" height={250} />}
          />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
          <div className={cls.footer}>
            <AppLink
              to={getRouteArticleDdetails(article.id)}
              target={target}
            >
              <Button
                variants={ButtonVariants.PRIMARY_OUTLINED}
              >
                {t('Read more')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <AppLink to={getRouteArticleDdetails(article.id)} target={target}>
      <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card onClick={onOpenArticle}>
          <div className={cls.imageWrapper}>
            <AppImage
              className={cls.img}
              src={article.img}
              alt={article.title}
              fallback={<Skeleton width={200} height={200} />}
            />
            <Text className={cls.date} text={article.createdAt} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text className={cls.title} text={article.title} />
        </Card>
      </div>
    </AppLink>
  );
});
