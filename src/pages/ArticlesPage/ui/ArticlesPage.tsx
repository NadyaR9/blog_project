import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('articles');

  return (
    <div className={classNames(cls.articlesPage, {}, [className])}>
      {t('Articles Page')}
    </div>
  );
};

export default memo(ArticlesPage);
