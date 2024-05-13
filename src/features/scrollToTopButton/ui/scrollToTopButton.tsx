import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ScrollIcon from '@/shared/assets/icons/redesigned/CircleUp.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface scrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: scrollToTopButtonProps) => {
  const { className } = props;
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      className={classNames('', {}, [className])}
      Svg={ScrollIcon}
      clickable
      onClick={onClick}
      width={32}
      height={32}
    />
  );
});
