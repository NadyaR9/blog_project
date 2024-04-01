import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components';
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
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonVariants } from '@/shared/ui/Button';

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
      <HStack
        max
        justify="between"
        className={classNames(cls.AddNewCommentForm, {}, [className])}
        data-testid="AddNewCommentForm"
      >
        <Input
          placeholder={t('Type your comment here')}
          value={text}
          onChange={onChangeText}
          data-testid="AddNewCommentForm.Input"
        />
        <Button
          onClick={onSendHandler}
          variants={ButtonVariants.PRIMARY_OUTLINED}
          data-testid="AddNewCommentForm.AddComment"
        >
          {t('Add New Comment')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default memo(AddNewCommentForm);
