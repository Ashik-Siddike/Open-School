import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Star, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import CountingGame from '../components/CountingGame';

interface PageData {
  title: string;
  description: string;
  content_type: 'youtube' | 'image' | 'video';
  youtube_link?: string;
  file_url?: string;
}

interface ContentData {
  id: string;
  title: string;
  subject: string;
  class: string;
  pages: PageData[];
  chapter_id?: string | number;
  chapter_name?: string;
}

const funEmojis = ['🎉', '🌟', '🚀', '✨', '🎈', '🦄', '😺', '🐻', '🐥', '🦋', '🍭', '🍀'];

const ContentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [allContents, setAllContents] = useState<ContentData[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  // URL থেকে subject/class বের করি
  const params = new URLSearchParams(location.search);
  const className = params.get('class') || undefined;
  const subject = params.get('subject') || undefined;

  // সব কনটেন্ট লোড
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('contents')
        .select('id, title, subject, class, pages')
        .order('created_at', { ascending: false });
      if (error) {
        setError('ডেটা লোড করা যায়নি');
        setLoading(false);
        return;
      }
      setAllContents(data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // প্রথমবার বা contentId চেঞ্জ হলে সেট করুন
  useEffect(() => {
    if (id) {
      setSelectedContentId(id);
    } else if (allContents.length > 0) {
      setSelectedContentId(allContents[0].id);
    }
  }, [id, allContents]);

  // নির্দিষ্ট কনটেন্ট লোড
  useEffect(() => {
    if (!selectedContentId) return;
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('id', selectedContentId)
        .single();
      if (error) {
        setError('ডেটা লোড করা যায়নি');
        setSelectedContent(null);
        setLoading(false);
        return;
      }
      setSelectedContent(data as ContentData);
      setLoading(false);
    };
    fetchContent();
  }, [selectedContentId]);

  // Sidebar-এ শুধু সিলেক্টেড subject/class-এর content দেখাবো
  const filteredContents = allContents.filter(content => {
    if (subject && className) {
      return content.subject === subject && content.class === className;
    } else if (subject) {
      return content.subject === subject;
    } else if (className) {
      return content.class === className;
    }
    return true;
  });

  // Chapter অনুযায়ী group (ধরা হচ্ছে subject/class অনুযায়ী filteredContents আসছে)
  // যদি chapter_id না থাকে, তাহলে title/grouping অনুযায়ী সাজাতে হবে
  // এখানে ধরলাম: chapter/grouping নেই, তাই সব content-ই একসাথে দেখাচ্ছে
  // যদি chapter/grouping থাকে, তাহলে নিচের মতো group করা যাবে:
  // const chapters = [...new Set(filteredContents.map(c => c.chapter))];
  // এখানে demo: title অনুযায়ী accordion

  // যদি chapter/grouping structure থাকে:
  // const chapters = [{ id, name, contents: [...] }]
  // এখানে filteredContents-এ chapter_id, chapter_name ধরে নিচ্ছি

  // Demo: chapter/grouping structure বানানো
  const chaptersMap: Record<string, { id: string; name: string; contents: ContentData[] }> = {};
  filteredContents.forEach((content) => {
    const chapterId = String(content.chapter_id ?? 'no-chapter');
    const chapterName = content.chapter_name ?? 'Uncategorized';
    if (!chaptersMap[chapterId]) {
      chaptersMap[chapterId] = { id: chapterId, name: chapterName, contents: [] };
    }
    chaptersMap[chapterId].contents.push(content);
  });
  const chapters = Object.values(chaptersMap);

  if (loading) return <div className="flex justify-center items-center h-64 text-3xl animate-bounce">লোড হচ্ছে... 🦄</div>;
  if (error) return <div className="text-red-600 text-center mt-8 text-2xl">{error} 😿</div>;
  if (!selectedContent || !selectedContent.pages || selectedContent.pages.length === 0) return <div className="text-center mt-8 text-xl">কোনো কনটেন্ট পাওয়া যায়নি 😕</div>;

  // এখন শুধু ১টি পেজ
  const page = selectedContent.pages[0];
  const emoji = funEmojis[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 flex flex-col md:flex-row items-start py-8 px-2">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white/80 rounded-2xl shadow-lg border border-eduplay-blue/10 mb-8 md:mb-0 md:mr-8 p-4 max-h-[80vh] overflow-y-auto sticky top-8">
        <h2 className="text-xl font-bold mb-4 text-eduplay-purple text-center">সব চ্যাপ্টার</h2>
        <ul className="space-y-2">
          {chapters.map(chapter => (
            <li key={chapter.id}>
              <button
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg font-semibold border border-transparent hover:bg-blue-50 hover:border-blue-200 text-left"
                onClick={() => setOpenChapterId(openChapterId === chapter.id ? null : chapter.id)}
              >
                <span>{chapter.name}</span>
                {openChapterId === chapter.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openChapterId === chapter.id && (
                <ul className="pl-4 mt-1 space-y-1">
                  {chapter.contents.map(content => (
                    <li key={content.id}>
                      <button
                        className={`w-full text-left px-3 py-1 rounded transition font-medium border border-transparent hover:bg-blue-100 hover:border-blue-300 flex flex-col ${selectedContentId === content.id ? 'bg-blue-100 border-blue-400 text-eduplay-purple' : ''}`}
                        onClick={() => setSelectedContentId(content.id)}
                      >
                        <span className="text-base">{content.title}</span>
                        <span className="text-xs text-gray-500">{content.subject} | {content.class}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <div className="flex-1 w-full max-w-4xl mx-auto">
        <div className="relative bg-white rounded-3xl shadow-2xl p-4 md:p-12 mb-8 border-4 border-eduplay-purple/20 animate-fade-in">
          {/* Fun emoji confetti */}
          <div className="absolute -top-8 left-4 text-4xl animate-bounce-gentle select-none">{emoji}</div>
          <div className="absolute -top-8 right-4 text-3xl animate-spin-slow select-none">✨</div>
          <div className="absolute -bottom-8 left-8 text-3xl animate-bounce select-none">🌟</div>
          <div className="absolute -bottom-8 right-8 text-4xl animate-bounce-gentle select-none">🎈</div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-eduplay-purple mb-3 drop-shadow-lg flex items-center justify-center gap-2">
            {page.title} <span className="text-3xl">{emoji}</span>
          </h1>
          {/* Description */}
          <section className="mb-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 rounded-xl p-4 shadow-inner min-h-[80px] border-2 border-eduplay-blue/10">
            <p className="text-lg md:text-xl text-gray-700 font-semibold whitespace-pre-line text-center">
              {page.description}
            </p>
          </section>
          {/* Media */}
          <section className="w-full flex justify-center items-center mb-2">
            {/* Special Content for Nursery Math */}
            {selectedContent?.class === 'nursery' && selectedContent?.subject === 'math' && (
              <div className="w-full mb-6">
                <CountingGame />
              </div>
            )}
            
            {page.content_type === 'youtube' && page.youtube_link && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border-4 border-eduplay-blue/30 shadow-lg min-h-[220px]">
                <iframe
                  title="YouTube Video"
                  src={`https://www.youtube.com/embed/${extractYouTubeId(page.youtube_link)}`}
                  className="w-full h-full min-h-[220px]"
                  allowFullScreen
                />
              </div>
            )}
            {page.content_type === 'image' && page.file_url && (
              <img
                src={page.file_url}
                alt={page.title}
                className="w-full max-h-[500px] min-h-[220px] object-contain rounded-2xl border-4 border-eduplay-blue/30 shadow-lg bg-white"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            {page.content_type === 'video' && page.file_url && (
              <video
                src={page.file_url}
                controls
                className="w-full max-h-[500px] min-h-[220px] rounded-2xl border-4 border-eduplay-blue/30 shadow-lg bg-black"
              >
                আপনার ব্রাউজার ভিডিও প্লে করতে পারে না।
              </video>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

// ইউটিউব লিংক থেকে ভিডিও আইডি বের করার হেল্পার
function extractYouTubeId(url?: string) {
  if (!url) return '';
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : '';
}

export default ContentPage; 