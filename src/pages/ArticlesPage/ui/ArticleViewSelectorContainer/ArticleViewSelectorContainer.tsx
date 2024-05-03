import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticleView } from '@/entities/Article';
import { articlesActions } from '../../model/slices/articlesPageSlice';
import { getArticlesView } from '../../model/selectors/getArticlesSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

interface ArticleViewSelectorContainerProps {
  className?: string;
}

export const ArticleViewSelectorContainer = memo(
  (props: ArticleViewSelectorContainerProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesView);
    const onViewChange = useCallback(
      (newView: ArticleView) => {
        dispatch(articlesActions.setView(newView));
      },
      [dispatch],
    );
    return (
      <ArticleViewSelector
        view={view}
        onViewChange={onViewChange}
        className={className}
      />
    );
  },
);
