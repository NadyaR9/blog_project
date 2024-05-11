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
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input as InputRedesigned } from '@/shared/ui/redesigned/Input';
import {
  Text as TextDeprecated,
  TextVariants,
} from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import {
  Button as ButtonDeprecated,
  ButtonVariants,
} from '@/shared/ui/deprecated/Button';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { ToggleFeature } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';

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
      <ToggleFeature
        name="isAppRedesigned"
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('auth form')} />
            {error && (
              <TextDeprecated text={t(error)} variants={TextVariants.ERROR} />
            )}
            <InputDeprecated
              type="text"
              className={cls.input}
              onChange={onChangeUsername}
              value={username}
              placeholder={t('Username')}
              autofocus
            />
            <InputDeprecated
              type="text"
              className={cls.input}
              onChange={onChangePassword}
              value={password}
              placeholder={t('password')}
            />
            <ButtonDeprecated
              className={cls.loginBtn}
              onClick={onLogin}
              disabled={isLoading}
              variants={ButtonVariants.OUTLINE}
            >
              {t('LogIn')}
            </ButtonDeprecated>
          </div>
        }
        on={
          <VStack className={classNames('', {}, [className])} gap="16">
            <TextRedesigned title={t('auth form')} />
            {error && <TextRedesigned text={t(error)} variants="error" />}
            <InputRedesigned
              type="text"
              className={cls.input}
              onChange={onChangeUsername}
              value={username}
              placeholder={t('Username')}
              autofocus
            />
            <InputRedesigned
              type="text"
              className={cls.input}
              onChange={onChangePassword}
              value={password}
              placeholder={t('password')}
            />
            <ButtonRedesigned
              className={cls.loginBtn}
              onClick={onLogin}
              disabled={isLoading}
              variants="outline"
            >
              {t('LogIn')}
            </ButtonRedesigned>
          </VStack>
        }
      />
    </DynamicModuleLoader>
  );
};

export default LoginForm;
