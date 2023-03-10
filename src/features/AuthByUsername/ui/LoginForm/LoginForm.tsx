import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  Button, ButtonVariants, Input, Text, TextVariants,
} from 'shared/ui';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { LoginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string,
}

const { setUsername, setPassword } = LoginActions;

export const LoginForm = (props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const {
    username, password, isLoading, error,
  } = useSelector(getLoginState);
  const { t } = useTranslation();

  const onChangeUsername = useCallback((value) => {
    dispatch(setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value) => {
    dispatch(setPassword(value));
  }, [dispatch]);

  const onLogin = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
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
  );
};
