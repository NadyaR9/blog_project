import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonVariants, Input } from 'shared/ui';
import { getAddNewCommentError, getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';
import cls from './AddNewCommentForm.module.scss';

export interface AddNewCommentFormProps {
  className?: string,
  onSendComment: (text: string) => void,
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

  const onChangeText = useCallback((value: string) => {
    dispatch(addNewCommentActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onChangeText('');
    onSendComment(text || '');
  }, [onChangeText, onSendComment, text]);

  return (
    <DynamicModuleLoader reducerList={reducersList}>
      <div className={classNames(cls.AddNewCommentForm, {}, [className])}>
        <Input
          placeholder={t('Type your comment here')}
          value={text}
          onChange={onChangeText}
        />
        <Button
          onClick={onSendHandler}
          variants={ButtonVariants.PRIMARY_OUTLINED}
        >
          {t('Add New Comment')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default memo(AddNewCommentForm);
