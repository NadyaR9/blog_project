import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Card } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Button, ButtonVariants } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';

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
    <>
      {feedbackTitle && <Text title={feedbackTitle} />}
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Type feedback')}
        data-testid="RatingCard.Input"
      />
    </>
  );

  return (
    <Card className={className} fullWidth data-testid="RatingCard">
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
                variants={ButtonVariants.SECONDARY_OUTLINED}
                data-testid="RatingCard.Cancel"
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={onSaveHandle}
                variants={ButtonVariants.PRIMARY_OUTLINED}
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
              variants={ButtonVariants.PRIMARY}
              data-testid="RatingCard.Save"
            >
              {t('Save')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});
