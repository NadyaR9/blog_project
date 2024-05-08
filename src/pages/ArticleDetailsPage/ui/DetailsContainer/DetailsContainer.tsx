import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetails } from '@/entities/Article';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Card className={className} padding="24" border="round" fullWidth>
      <ArticleDetails id={id} />
    </Card>
  );
});
