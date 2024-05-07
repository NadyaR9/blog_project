import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitchersProps {
  className?: string;
}

export const UiDesignSwitchers = memo((props: UiDesignSwitchersProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const items = [
    {
      content: t('New'),
      value: 'new',
    },
    {
      content: t('Old'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlags({
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
          userId: authData.id,
        }),
      );
      setIsLoading(false);
    }
  };

  return (
    <HStack gap="8">
      <Text text={t('Interface option')} />
      {isLoading ? (
        <Skeleton width={100} height={40} border="34px" />
      ) : (
        <ListBox
          onChange={onChange}
          className={className}
          items={items}
          value={isAppRedesigned ? 'new' : 'old'}
          directions="bottom right"
        />
      )}
    </HStack>
  );
});
