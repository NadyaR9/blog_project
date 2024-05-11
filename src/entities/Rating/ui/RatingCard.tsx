import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Modal, Modal as ModalDeprecated } from '@/shared/ui/redesigned/Modal';
import {
  Button as ButtonDeprecated,
  ButtonVariants,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { ToggleFeature } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button';

interface RatingProps {
  className?: string;
  rate?: number;
  onCancel?: (start: number) => void;
  onAccept?: (start: number, feedback?: string) => void;
  title?: string;
  hasFeedback?: boolean;
  feedbackTitle?: string;
}

export const RatingCard = memo((props: RatingProps) => {
  const {
    className,
    feedbackTitle,
    rate = 0,
    onCancel,
    onAccept,
    title,
    hasFeedback,
  } = props;
  const [feedback, setFeedback] = useState('');
  const [starsCount, setStarsCount] = useState(rate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const onSelectStar = useCallback(
    (value: number) => {
      setStarsCount(value);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(value);
      }
    },
    [onAccept, hasFeedback],
  );

  const onSaveHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [onAccept, starsCount, feedback]);

  const onCancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <>
          {feedbackTitle && <Text title={feedbackTitle} />}
          <Input
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Type feedback')}
            data-testid="RatingCard.Input"
          />
        </>
      }
      off={
        <>
          {feedbackTitle && <TextDeprecated title={feedbackTitle} />}
          <InputDeprecated
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Type feedback')}
            data-testid="RatingCard.Input"
          />
        </>
      }
    />
  );

  const content = (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <>
          <VStack max gap="8" align="center">
            {title && <Text title={title} />}
            <StarRating onSelect={onSelectStar} selectedStar={starsCount} />
          </VStack>
          <BrowserView>
            <Modal isOpen={isModalOpen} lazy onClose={onCancelHandle}>
              <VStack max gap="16">
                {modalContent}
                <HStack max justify="end" gap="16">
                  <Button
                    onClick={onCancelHandle}
                    variants="outline"
                    data-testid="RatingCard.Cancel"
                  >
                    {t('Cancel')}
                  </Button>
                  <Button
                    onClick={onSaveHandle}
                    variants="filled"
                    data-testid="RatingCard.Save"
                  >
                    {t('Save')}
                  </Button>
                </HStack>
              </VStack>
            </Modal>
          </BrowserView>
          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={onCancelHandle}>
              <VStack max gap="32">
                {modalContent}
                <Button
                  onClick={onSaveHandle}
                  variants="filled"
                  data-testid="RatingCard.Save"
                >
                  {t('Save')}
                </Button>
              </VStack>
            </Drawer>
          </MobileView>
        </>
      }
      off={
        <>
          <VStack max gap="8" align="center">
            {title && <TextDeprecated title={title} />}
            <StarRating onSelect={onSelectStar} selectedStar={starsCount} />
          </VStack>
          <BrowserView>
            <ModalDeprecated isOpen={isModalOpen} lazy onClose={onCancelHandle}>
              <VStack max gap="16">
                {modalContent}
                <HStack max justify="end" gap="16">
                  <ButtonDeprecated
                    onClick={onCancelHandle}
                    variants={ButtonVariants.SECONDARY_OUTLINED}
                    data-testid="RatingCard.Cancel"
                  >
                    {t('Cancel')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    onClick={onSaveHandle}
                    variants={ButtonVariants.PRIMARY_OUTLINED}
                    data-testid="RatingCard.Save"
                  >
                    {t('Save')}
                  </ButtonDeprecated>
                </HStack>
              </VStack>
            </ModalDeprecated>
          </BrowserView>
          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={onCancelHandle}>
              <VStack max gap="32">
                {modalContent}
                <ButtonDeprecated
                  onClick={onSaveHandle}
                  variants={ButtonVariants.PRIMARY}
                  data-testid="RatingCard.Save"
                >
                  {t('Save')}
                </ButtonDeprecated>
              </VStack>
            </Drawer>
          </MobileView>
        </>
      }
    />
  );
  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <Card
          className={className}
          fullWidth
          data-testid="RatingCard"
          padding="24"
          border="round"
        >
          {content}
        </Card>
      }
      off={
        <CardDeprecated
          className={className}
          fullWidth
          data-testid="RatingCard"
        >
          {content}
        </CardDeprecated>
      }
    />
  );
});
