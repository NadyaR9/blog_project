import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { fetchArticleDetailsData } from '../../model/services/fetchArticleDetailsData/fetchArticleDetailsData';
import cls from './ArticleDetails.module.scss';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import {
  Text as TextDeprecated,
  TextSize,
  TextVariants,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { renderArticleBlock } from './renderArticleBlock';
import { ToggleFeature, toggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const initialReducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

const Redesigned = () => {
  const data = useSelector(getArticleDetailsData);

  return (
    <VStack gap="16" max>
      <Text title={data?.title} bold size="l" />
      <Text title={data?.subtitle} size="m" />
      <AppImage
        fallback={<SkeletonRedesigned width="100%" height={420} border="16" />}
        src={data?.img}
        className={cls.img}
      />
      {data?.blocks.map(renderArticleBlock)}
    </VStack>
  );
};

const Deprecated = () => {
  const data = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack max justify="center">
        <AvatarDeprecated size={150} src={data?.img} />
      </HStack>
      <VStack gap="4" max>
        <TextDeprecated
          title={data?.title}
          text={data?.subtitle}
          size={TextSize.L}
        />
        <HStack justify="center" gap="8">
          <IconDeprecated Svg={EyeIcon} />
          <TextDeprecated text={String(data?.views)} />
        </HStack>
        <HStack justify="center" gap="8">
          <IconDeprecated Svg={CalendarIcon} />
          <TextDeprecated text={data?.createdAt} />
        </HStack>
      </VStack>
      {data?.blocks.map(renderArticleBlock)}
    </>
  );
};
export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const error = useSelector(getArticleDetailsError);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleDetailsData(id));
    }
  }, [dispatch, id]);

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  let content;

  if (error) {
    content = (
      <ToggleFeature
        name="isAppRedesigned"
        off={
          <TextDeprecated
            variants={TextVariants.ERROR}
            text={t('Articles Details Request Error')}
          />
        }
        on={
          <Text variants="error" text={t('Articles Details Request Error')} />
        }
      />
    );
  } else if (isLoading) {
    content = (
      <VStack max justify="center" gap="16">
        <Skeleton
          className={cls.avatar}
          width={150}
          height={150}
          border="50%"
        />
        <Skeleton className={cls.title} width="100%" height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </VStack>
    );
  } else {
    content = (
      <ToggleFeature
        name="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducerList={initialReducers} removeAfterUnmount>
      <VStack
        gap="16"
        max
        className={classNames(cls.ArticleDetails, {}, [className])}
        data-testid="ArticleDetails.Info"
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
