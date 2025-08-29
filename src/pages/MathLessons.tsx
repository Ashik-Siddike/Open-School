import ContentList from './ContentList';
import { useLocation } from 'react-router-dom';

const MathLessons = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const className = params.get('class');
  return <ContentList subject="math" className={className || undefined} />;
};

export default MathLessons;
