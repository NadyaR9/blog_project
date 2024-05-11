import { useSelector } from 'react-redux';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);

  if (!article) return null;

  return (
    <Card padding="24" border="round" className={cls.Card}>
      <ArticleAdditionalInfo
        views={article.views}
        author={article.user}
        createdAt={article.createdAt}
      />
    </Card>
  );
});
