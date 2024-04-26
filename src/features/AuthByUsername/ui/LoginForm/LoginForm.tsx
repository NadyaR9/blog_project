import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { LoginActions, LoginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/deprecated/Input';
import { Text, TextVariants } from '@/shared/ui/deprecated/Text';
import { Button, ButtonVariants } from '@/shared/ui/deprecated/Button';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: LoginReducer,
};

const { setUsername, setPassword } = LoginActions;

const LoginForm = (props: LoginFormProps) => {
  const { className, onSuccess } = props;
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginLoading);

  const { t } = useTranslation();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(setPassword(value));
    },
    [dispatch],
  );

  const onLogin = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  return (
    <DynamicModuleLoader reducerList={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('auth form')} />
        {error && <Text text={t(error)} variants={TextVariants.ERROR} />}
        <Input
          type="text"
          className={cls.input}
          onChange={onChangeUsername}
          value={username}
          placeholder={t('Username')}
          autofocus
        />
        <Input
          type="text"
          className={cls.input}
          onChange={onChangePassword}
          value={password}
          placeholder={t('password')}
        />
        <Button
          className={cls.loginBtn}
          onClick={onLogin}
          disabled={isLoading}
          variants={ButtonVariants.OUTLINE}
        >
          {t('LogIn')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default LoginForm;
