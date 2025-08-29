import ContentList from './ContentList';
import { useLocation } from 'react-router-dom';

const EnglishLessons = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const className = params.get('class');
  return <ContentList subject="english" className={className || undefined} />;
};

export default EnglishLessons;
