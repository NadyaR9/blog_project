import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  Avatar, Skeleton, Text, TextSize, TextVariants, Icon,
} from 'shared/ui';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleDetailsData } from '../../model/services/fetchArticleDetailsData/fetchArticleDetailsData';
import cls from './ArticleDetails.module.scss';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { ArticleBlocks, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

interface ArticleDetailsProps {
  className?: string,
  id: string,
}

const initialReducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const error = useSelector(getArticleDetailsError);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const data = useSelector(getArticleDetailsData);
  const renderBlock = useCallback((block: ArticleBlocks) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent key={block.id} block={block} className={cls.block} />;
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
    default:
      return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleDetailsData(id));
    }
  }, [dispatch, id]);

  let content;

  if (error) {
    content = (
      <Text
        variants={TextVariants.ERROR}
        text={t('Articles Details Request Error')}
      />
    );
  } else if (isLoading) {
    content = (
      <div className={cls.skeletonWrapper}>
        <Skeleton className={cls.avatar} width={150} height={150} border="50%" />
        <Skeleton className={cls.title} width="100%" height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </div>
    );
  } else {
    content = (
      <div className={cls.skeletonWrapper}>
        <div className={cls.avatarWrapper}>
          <Avatar size={150} src={data?.img} />
        </div>
        <Text
          title={data?.title}
          text={data?.subtitle}
          size={TextSize.L}
        />
        <div className={cls.articleItem}>
          <Icon Svg={EyeIcon} />
          <Text
            text={String(data?.views)}
          />
        </div>
        <div className={cls.articleItem}>
          <Icon Svg={CalendarIcon} />
          <Text
            text={data?.createdAt}
          />
        </div>
        {data?.blocks.map(renderBlock)}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducerList={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});