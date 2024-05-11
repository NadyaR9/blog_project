import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getAddNewCommentError,
  getAddNewCommentText,
} from '../../model/selectors/addNewCommentSelectors';
import {
  addNewCommentActions,
  addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';
import cls from './AddNewCommentForm.module.scss';
import SendIcon from '@/shared/assets/icons/redesigned/Send.svg';
import SearchIcon from '@/shared/assets/icons/redesigned/Search.svg';
import { Input } from '@/shared/ui/redesigned/Input';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import {
  Button as ButtonDeprecated,
  ButtonVariants,
} from '@/shared/ui/deprecated/Button';
import { ToggleFeature } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddNewCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducersList: ReducerList = {
  addNewComment: addNewCommentReducer,
};

const AddNewCommentForm = memo((props: AddNewCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation('comments');
  const dispatch = useAppDispatch();
  const text = useSelector(getAddNewCommentText);
  const error = useSelector(getAddNewCommentError);

  const onChangeText = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onChangeText('');
    onSendComment(text || '');
  }, [onChangeText, onSendComment, text]);

  return (
    <DynamicModuleLoader reducerList={reducersList}>
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <Card padding="24" border="round" fullWidth>
            <HStack
              max
              gap="16"
              justify="between"
              className={classNames(cls.AddNewCommentFormRedesigned, {}, [
                className,
              ])}
              data-testid="AddNewCommentForm"
            >
              <Input
                placeholder={t('Type your comment here')}
                value={text}
                onChange={onChangeText}
                data-testid="AddNewCommentForm.Input"
                className={cls.redesignedInput}
                addonLeft={<Icon Svg={SearchIcon} />}
              />
              <Icon
                clickable
                onClick={onSendHandler}
                Svg={SendIcon}
                data-testid="AddNewCommentForm.AddComment"
              />
            </HStack>
          </Card>
        }
        off={
          <HStack
            max
            justify="between"
            className={classNames(cls.AddNewCommentForm, {}, [className])}
            data-testid="AddNewCommentForm"
          >
            <InputDeprecated
              placeholder={t('Type your comment here')}
              value={text}
              onChange={onChangeText}
              data-testid="AddNewCommentForm.Input"
            />
            <ButtonDeprecated
              onClick={onSendHandler}
              variants={ButtonVariants.PRIMARY_OUTLINED}
              data-testid="AddNewCommentForm.AddComment"
            >
              {t('Add New Comment')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default memo(AddNewCommentForm);
