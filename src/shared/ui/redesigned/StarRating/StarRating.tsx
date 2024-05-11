import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarDeprecated from '@/shared/assets/icons/star.svg';
import Star from '@/shared/assets/icons/redesigned/Star.svg';

import cls from './StarRating.module.scss';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { Icon } from '../Icon/Icon';
import { HStack } from '../../redesigned/Stack';
import { ToggleFeature, toggleFeatures } from '@/shared/lib/features';

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
    <HStack
      gap="8"
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.StarRatingRedesigned,
          off: () => cls.StarRating,
        }),
        {},
        [className],
      )}
    >
      {StartNumbers.map((star) => {
        const commonProps = {
          key: star,
          Svg: Star,
          className: classNames(
            cls.starIcon,
            {
              [cls.selected]: isSelected,
            },
            [currentStart >= star ? cls.hovered : cls.normal],
          ),
          onMouseEnter: onHover(star),
          onMouseLeave: onLeave,
          onClick: onStarSelect(star),
          width: size,
          height: size,
          'data-testid': `StarRating.${star}`,
          'data-selected': currentStart >= star,
        };
        return (
          <ToggleFeature
            name="isAppRedesigned"
            on={<Icon {...commonProps} Svg={Star} clickable={!isSelected} />}
            off={<IconDeprecated {...commonProps} Svg={StarDeprecated} />}
          />
        );
      })}
    </HStack>
  );
});
