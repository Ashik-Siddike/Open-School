import ContentList from './ContentList';
import { useLocation } from 'react-router-dom';

const ScienceLessons = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const className = params.get('class');
  return <ContentList subject="science" className={className || undefined} />;
};

export default ScienceLessons;
