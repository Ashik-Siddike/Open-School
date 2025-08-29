import ContentList from './ContentList';
import { useLocation } from 'react-router-dom';

const BanglaLessons = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const className = params.get('class');
  return <ContentList subject="bangla" className={className || undefined} />;
};

export default BanglaLessons;
