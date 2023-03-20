import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('articles');

  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      {t('Articles Details Page')}
    </div>
  );
};

export default memo(ArticleDetailsPage);
