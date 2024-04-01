import { memo, useState } from 'react';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import Star from '@/shared/assets/icons/star.svg';

import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import { HStack } from '../Stack/HStack/HStack';

interface StarRatingProps {
  className?: string;
  selectedStar?: number;
  onSelect?: (value: number) => void;
  size?: number;
}

const StartNumbers = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, selectedStar = 0, size = 30 } = props;
  const [currentStart, setCurrentStart] = useState(selectedStar);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStar));

  const onHover = (value: number) => () => {
    if (!isSelected) {
      setCurrentStart(value);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStart(0);
    }
  };

  const onStarSelect = (value: number) => () => {
    if (!isSelected) {
      onSelect?.(value);
      setIsSelected(true);
      setCurrentStart(value);
    }
  };

  return (
    <HStack gap="8" className={classNames(cls.StarRating, {}, [className])}>
      {StartNumbers.map((star) => (
        <Icon
          key={star}
          Svg={Star}
          className={classNames(
            cls.starIcon,
            {
              [cls.selected]: isSelected,
            },
            [currentStart >= star ? cls.hovered : cls.normal],
          )}
          onMouseEnter={onHover(star)}
          onMouseLeave={onLeave}
          onClick={onStarSelect(star)}
          width={size}
          height={size}
          data-testid={`StarRating.${star}`}
          data-selected={currentStart >= star}
        />
      ))}
    </HStack>
  );
});
