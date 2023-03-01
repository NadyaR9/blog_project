import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Button, Input } from 'shared/ui';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string,
}

export const LoginForm = (props: LoginFormProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onUsernameChange = (value: string) => {
    setUsername(value);
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        type="text"
        className={cls.input}
        onChange={onUsernameChange}
        value={username}
        placeholder={t('Username')}
        autofocus
      />
      <Input
        type="text"
        className={cls.input}
        onChange={onPasswordChange}
        value={password}
        placeholder={t('password')}
      />
      <Button
        className={cls.loginBtn}
      >
        {t('LogIn')}
      </Button>
    </div>
  );
};
