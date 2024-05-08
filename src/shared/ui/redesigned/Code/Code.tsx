import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIconDeprecated from '@/shared/assets/icons/copy.svg';
import CopyIcon from '@/shared/assets/icons/redesigned/Copy.svg';
import { Button } from '../../deprecated/Button';
import cls from './Code.module.scss';
import { ToggleFeature } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeature
      name="isAppRedesigned"
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button className={cls.copyBtn} onClick={onCopy}>
            <CopyIconDeprecated className={cls.icon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            Svg={CopyIcon}
            className={cls.copyBtn}
          />
          <code>{text}</code>
        </pre>
      }
    />
  );
});
