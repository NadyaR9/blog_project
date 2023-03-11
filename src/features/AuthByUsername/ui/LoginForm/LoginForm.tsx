import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  Button, ButtonVariants, Input, Text, TextVariants,
} from 'shared/ui';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { LoginActions, LoginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string,
}

const initialReducers: ReducerList = {
  loginForm: LoginReducer,
};

const { setUsername, setPassword } = LoginActions;

const LoginForm = (props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginLoading);

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
    <DynamicModuleLoader
      reducerList={initialReducers}
      removeAfterUnmount
    >
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
