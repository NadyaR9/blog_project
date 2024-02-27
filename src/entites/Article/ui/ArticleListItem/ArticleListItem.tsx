import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  AppLink,
  Avatar, Button, ButtonVariants, Card, Icon, Text,
} from 'shared/ui';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { useHover } from 'shared/config/lib/hooks/useHover/useHover';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/route/routeConfig/routeConfig';
import {
  Article, ArticleBlockText, ArticleBlockType, ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleListItem.module.scss';

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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article.id}`);
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
          <img className={cls.img} src={article.img} alt={article.title} />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
          <div className={cls.footer}>
            <AppLink
              to={RoutePath.article_details + article.id}
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
    <AppLink to={RoutePath.article_details + article.id} target={target}>
      <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card onClick={onOpenArticle}>
          <div className={cls.imageWrapper}>
            <img className={cls.img} src={article.img} alt={article.title} />
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
