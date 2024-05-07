import { useTranslation } from 'react-i18next';

import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitchers } from '@/features/uiDesignSwitchers';

const SettingsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page>
      <VStack>
        <Text text={t('Settings Page')} />
        <UiDesignSwitchers />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
