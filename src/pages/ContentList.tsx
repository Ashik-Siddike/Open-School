import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { getClassAndSubjectFromURL } from '../lib/utils';

const funEmojis = ['📚', '🦄', '🌟', '🚀', '🎈', '🐥', '🍭', '🧸', '🦋'];

interface ContentItem {
  id: string;
  title: string;
  class: string;
  subject: string;
}

const ContentList: React.FC<{ className?: string; subject?: string }> = (props) => {
  const location = useLocation();
  // Always extract from props or URL
  const { className, subject } = {
    className: props.className ?? getClassAndSubjectFromURL(location.search).className,
    subject: props.subject ?? getClassAndSubjectFromURL(location.search).subject,
  };

  // DEV warning (Vite)
  if (import.meta.env.DEV && (!className || !subject)) {
    console.warn('ContentList: className এবং subject দুইটাই অবশ্যই লাগবে!');
  }

  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      setError(null);
      const normalizedClass = normalizeClassParam(className);
      const normalizedSubject = normalizeSubjectParam(subject);
      let query = supabase.from('contents').select('id, title, class, subject');
      if (normalizedClass) query = query.eq('class', normalizedClass);
      if (normalizedSubject) query = query.eq('subject', normalizedSubject);
      const { data, error } = await query;
      if (error) {
        setError('ডেটা লোড করা যায়নি');
        setLoading(false);
        return;
      }
      setContents(data || []);
      setLoading(false);
    };
    fetchContents();
  }, [className, subject]);

  function normalizeClassParam(v?: string | null): string | undefined {
    if (!v) return undefined;
    const raw = decodeURIComponent(v).toLowerCase().replace(/[-_]+/g, ' ').trim();
    // Strip trailing colon parts like "grade 1:1" → "grade 1"
    const cleaned = raw.replace(/:.+$/, '');
    if (cleaned === 'nursery') return 'nursery';
    // direct formats already ok
    if (['1st','2nd','3rd','4th','5th'].includes(cleaned)) return cleaned;
    const m = cleaned.match(/grade\s*(\d)/);
    if (m) {
      const n = Number(m[1]);
      return n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : n === 4 ? '4th' : n === 5 ? '5th' : undefined;
    }
    return cleaned;
  }

  function normalizeSubjectParam(v?: string | null): string | undefined {
    if (!v) return undefined;
    const raw = decodeURIComponent(v).toLowerCase().trim();
    // unify common aliases
    if (raw.includes('math')) return 'math';
    if (raw.includes('english')) return 'english';
    if (raw.includes('bangla')) return 'bangla';
    if (raw.includes('science')) return 'science';
    // unknown subject → skip subject filter
    return undefined;
  }

  if (loading) return <div className="text-center py-16 text-3xl animate-bounce">লোড হচ্ছে... 🦄</div>;
  if (error) return <div className="text-red-600 text-center py-16 text-2xl">{error} 😿</div>;

  // Frontend filter for class and subject
  const filteredContents = contents.filter(content => {
    let match = true;
    if (className) match = match && content.class === className;
    if (subject) match = match && content.subject === subject;
    return match;
  });
  if (filteredContents.length === 0) return <div className="text-center py-16 text-2xl">কোনো কনটেন্ট পাওয়া যায়নি 😕</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-eduplay-purple mb-8 drop-shadow flex items-center justify-center gap-2">
          <span>কনটেন্ট লিস্ট</span> <span className="text-2xl">{funEmojis[contents.length % funEmojis.length]}</span>
        </h1>
        <ul className="grid gap-6 md:grid-cols-2">
          {filteredContents.map((content, idx) => (
            <li key={content.id}>
              <Link
                to={`/content/${content.id}?subject=${encodeURIComponent(content.subject)}&class=${encodeURIComponent(content.class)}`}
                className="block bg-white rounded-2xl shadow-md border border-eduplay-purple/10 p-6 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer relative animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* One emoji per card, top left */}
                <div className="absolute -top-5 left-5 text-2xl select-none animate-bounce-gentle">{funEmojis[idx % funEmojis.length]}</div>
                {/* Title */}
                <div className="font-bold text-xl text-eduplay-blue mb-2 text-center flex items-center justify-center gap-2">
                  {content.title}
                </div>
                {/* Badges */}
                <div className="flex justify-center gap-2 mb-2">
                  <span className="inline-block bg-blue-100 text-eduplay-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">ক্লাস: {content.class}</span>
                  <span className="inline-block bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">বিষয়: {content.subject}</span>
                </div>
                {/* Arrow/CTA */}
                <div className="flex justify-center mt-4">
                  <span className="inline-block bg-eduplay-purple text-white font-bold px-6 py-2 rounded-full shadow hover:scale-105 transition-all duration-200 text-base">দেখুন &rarr;</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentList; 