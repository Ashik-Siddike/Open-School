import React, { useEffect, useState } from 'react';
import { Plus, Trash2, ArrowLeft, Settings, Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '../lib/supabaseClient';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod Schema
const pageSchema = z.object({
  title: z.string().min(1, 'পেজের শিরোনাম দিন'),
  description: z.string().min(1, 'পেজের বর্ণনা দিন'),
  content_type: z.enum(['youtube', 'image', 'video']),
  youtube_link: z.string().optional(),
  file_url: z.string().optional(),
});

const contentSchema = z.object({
  grade_id: z.number({ required_error: 'ক্লাস নির্বাচন করুন' }),
  subject_id: z.number({ required_error: 'বিষয় নির্বাচন করুন' }),
  chapter_id: z.number({ required_error: 'চ্যাপ্টার নির্বাচন করুন' }),
  title: z.string().min(1, 'শিরোনাম দিন'),
  description: z.string().min(1, 'বর্ণনা দিন'),
  content_type: z.enum(['youtube', 'image', 'video']),
  youtube_link: z.string().optional(),
  file_url: z.string().optional(),
});

type PageForm = z.infer<typeof pageSchema>;
type ContentForm = z.infer<typeof contentSchema>;

// Types
type Grade = { id: number; name: string };
type Subject = { id: number; name: string; grade_id: number };
type Chapter = { id: number; name: string; grade_id: number; subject_id: number };
type ContentRow = {
  id: string;
  title: string;
  description?: string | null;
  content_type: 'youtube' | 'image' | 'video';
  youtube_link?: string | null;
  file_url?: string | null;
  class?: string | null;
  subject?: string | null;
  chapter_id?: number | null;
  pages?: PageForm[] | null;
};

// ক্লাস নাম ম্যাপিং
const classMap: Record<string, string> = {
  'Nursery': 'nursery',
  'Grade 1': '1st',
  'Grade 2': '2nd',
  'Grade 3': '3rd',
  'Grade 4': '4th',
  'Grade 5': '5th',
};

const inverseClassMap: Record<string, string> = {
  'nursery': 'Nursery',
  '1st': 'Grade 1',
  '2nd': 'Grade 2',
  '3rd': 'Grade 3',
  '4th': 'Grade 4',
  '5th': 'Grade 5',
};

const AdminPanel = () => {
  // Auth state
  const [user, setUser] = useState<{ id: string } | null>(null);

  // Content CRUD state
  const [contents, setContents] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [modalGradeId, setModalGradeId] = useState<number | null>(null);
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [newChapter, setNewChapter] = useState('');
  const [modalChapterGradeId, setModalChapterGradeId] = useState<number | null>(null);
  const [modalChapterSubjectId, setModalChapterSubjectId] = useState<number | null>(null);
  // Accordion state
  const [openGradeId, setOpenGradeId] = useState<number | null>(null);
  const [openSubjectId, setOpenSubjectId] = useState<number | null>(null);

  // React Hook Form
  const methods = useForm<ContentForm>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      grade_id: undefined,
      subject_id: undefined,
      chapter_id: undefined,
      title: '',
      description: '',
      content_type: 'youtube',
      youtube_link: '',
      file_url: '',
    },
  });
  const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = methods;

  // Fetch user, grades & subjects
  useEffect(() => {
    const fetchAuthAndBasics = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user ? { id: userData.user.id } : null);
      const { data } = await supabase.from('grades').select('*').order('name');
      setGrades(data || []);
      const { data: subjectsData } = await supabase.from('subjects').select('*');
      setSubjects(subjectsData || []);
    };
    fetchAuthAndBasics();
  }, []);

  // নতুন useEffect: কন্টেন্ট লোড
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('contents').select('*').order('created_at', { ascending: false });
      setContents(data || []);
      setLoading(false);
    };
    fetchContents();
  }, []);

  // Filter subjects by selected grade
  const selectedGradeId = watch('grade_id');
  useEffect(() => {
    if (selectedGradeId) {
      setFilteredSubjects(subjects.filter(s => s.grade_id === selectedGradeId));
      setValue('subject_id', undefined);
    } else {
      setFilteredSubjects([]);
      setValue('subject_id', undefined);
    }
  }, [selectedGradeId, subjects, setValue]);

  // Fetch chapters
  useEffect(() => {
    const fetchChapters = async () => {
      const { data } = await supabase.from('chapters').select('*');
      setChapters(data || []);
    };
    fetchChapters();
  }, []);

  // Filter chapters by selected grade & subject
  const selectedSubjectId = watch('subject_id');
  useEffect(() => {
    if (selectedGradeId && selectedSubjectId) {
      setFilteredChapters(chapters.filter(c => c.grade_id === selectedGradeId && c.subject_id === selectedSubjectId));
      setValue('chapter_id', undefined);
    } else {
      setFilteredChapters([]);
      setValue('chapter_id', undefined);
    }
  }, [selectedGradeId, selectedSubjectId, chapters, setValue]);

  // Refresh grades/subjects after add
  const refreshGrades = async () => {
    const { data } = await supabase.from('grades').select('*').order('name');
    setGrades(data || []);
  };
  const refreshSubjects = async () => {
    const { data } = await supabase.from('subjects').select('*');
    setSubjects(data || []);
  };
  const refreshChapters = async () => {
    const { data } = await supabase.from('chapters').select('*');
    setChapters(data || []);
  };

  // Add new grade
  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrade.trim()) return;
    if (!user) { alert('অনুগ্রহ করে লগইন করুন (authenticated write প্রয়োজন)।'); return; }
    const { error: insertError } = await supabase.from('grades').insert({ name: newGrade.trim() });
    if (insertError) { alert('Grade যোগ করতে ব্যর্থ: ' + insertError.message); return; }
    setNewGrade('');
    setShowGradeModal(false);
    await refreshGrades();
    // নতুন গ্রেড সিলেক্ট করুন
    const { data } = await supabase.from('grades').select('*').eq('name', newGrade.trim()).maybeSingle();
    if (data) setValue('grade_id', data.id);
  };
  // Add new subject
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !modalGradeId) return;
    if (!user) { alert('অনুগ্রহ করে লগইন করুন (authenticated write প্রয়োজন)।'); return; }
    const { error: insertError } = await supabase.from('subjects').insert({ name: newSubject.trim(), grade_id: modalGradeId });
    if (insertError) { alert('Subject যোগ করতে ব্যর্থ: ' + insertError.message); return; }
    setNewSubject('');
    setShowSubjectModal(false);
    await refreshSubjects();
    // নতুন সাবজেক্ট সিলেক্ট করুন
    const { data } = await supabase.from('subjects').select('*').eq('name', newSubject.trim()).eq('grade_id', modalGradeId).maybeSingle();
    if (data) setValue('subject_id', data.id);
  };
  // Add new chapter
  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapter.trim() || !modalChapterGradeId || !modalChapterSubjectId) return;
    if (!user) { alert('অনুগ্রহ করে লগইন করুন (authenticated write প্রয়োজন)।'); return; }
    const { error: insertError } = await supabase.from('chapters').insert({ name: newChapter.trim(), grade_id: modalChapterGradeId, subject_id: modalChapterSubjectId });
    if (insertError) { alert('Chapter যোগ করতে ব্যর্থ: ' + insertError.message); return; }
    setNewChapter('');
    setShowChapterModal(false);
    await refreshChapters();
    // নতুন চ্যাপ্টার সিলেক্ট করুন
    const { data } = await supabase.from('chapters').select('*').eq('name', newChapter.trim()).eq('grade_id', modalChapterGradeId).eq('subject_id', modalChapterSubjectId).maybeSingle();
    if (data) setValue('chapter_id', data.id);
  };

  // Edit বাটনে ক্লিক করলে ফর্মে ডাটা সেট
  const handleEditContent = async (content: ContentRow) => {
    setEditingId(content.id);
    // grade_id, subject_id, chapter_id বের করতে হবে
    const gradeNameFromClass = content.class ? (inverseClassMap[content.class] || content.class) : undefined;
    const grade = grades.find(g => g.name.toLowerCase() === (gradeNameFromClass || '').toLowerCase()) || grades[0];
    const subject = subjects.find(s => s.name.toLowerCase() === content.subject?.toLowerCase() && s.grade_id === grade?.id);
    // প্রথমে grade_id, subject_id সেট করুন
    methods.reset({
      grade_id: grade?.id,
      subject_id: subject?.id,
      chapter_id: undefined, // পরে সেট করবো
      title: content.title,
      description: content.description,
      content_type: content.content_type,
      youtube_link: content.youtube_link || '',
      file_url: content.file_url || '',
    });
    // filteredSubjects/filteredChapters আপডেট হওয়ার জন্য একটু delay দিন
    setTimeout(() => {
      const chapter = chapters.find(c => c.id === content.chapter_id);
      methods.setValue('chapter_id', chapter?.id);
    }, 100);
  };

  // Update content
  const handleUpdateContent = async (values: ContentForm) => {
    if (!editingId) return;
    const { grade_id, subject_id, chapter_id, title, description, content_type, youtube_link, file_url } = values;
    console.log('Update values:', values);
    const gradeName = grades.find(g => g.id === grade_id)?.name || '';
    const subjectName = (filteredSubjects.find(s => s.id === subject_id)?.name || '').toLowerCase();
    const classValue = classMap[gradeName] || gradeName;
    const updateObj = {
      class: classValue,
      subject: subjectName,
      chapter_id,
      pages: [{ title, description, content_type, youtube_link, file_url }],
      title,
      description,
      content_type,
      youtube_link,
      file_url
    };
    console.log('Update object:', updateObj);
    const { error } = await supabase.from('contents').update(updateObj).eq('id', editingId);
    if (error) {
      alert('Update error: ' + error.message);
      console.error('Supabase update error:', error);
      return;
    }
    alert('কনটেন্ট আপডেট হয়েছে!');
    setEditingId(null);
    reset({
      grade_id: undefined,
      subject_id: undefined,
      chapter_id: undefined,
      title: '',
      description: '',
      content_type: 'youtube',
      youtube_link: '',
      file_url: '',
    });
    const { data } = await supabase.from('contents').select('*').order('created_at', { ascending: false });
    setContents(data || []);
  };

  // Add content
  const onSubmit = async (values: ContentForm) => {
    const { grade_id, subject_id, chapter_id, title, description, content_type, youtube_link, file_url } = values;
    if (!user) { alert('অনুগ্রহ করে লগইন করুন (authenticated write প্রয়োজন)।'); return; }
    const gradeName = grades.find(g => g.id === grade_id)?.name || '';
    const subjectName = (filteredSubjects.find(s => s.id === subject_id)?.name || '').toLowerCase();
    const classValue = classMap[gradeName] || gradeName;
    const { error } = await supabase.from('contents').insert([
      {
        class: classValue,
        subject: subjectName,
        chapter_id,
        pages: [{ title, description, content_type, youtube_link, file_url }],
        title,
        description,
        content_type,
        youtube_link,
        file_url
      }
    ]);
    if (!error) {
      alert('নতুন কনটেন্ট যোগ হয়েছে!');
      reset({
        grade_id: undefined,
        subject_id: undefined,
        chapter_id: undefined,
        title: '',
        description: '',
        content_type: 'youtube',
        youtube_link: '',
        file_url: '',
      });
      const { data } = await supabase.from('contents').select('*').order('created_at', { ascending: false });
      setContents(data || []);
    }
  };

  // Delete content
  const handleDeleteContent = async (id: string) => {
    const { error } = await supabase.from('contents').delete().eq('id', id);
    if (!error) {
      alert('কনটেন্ট ডিলিট হয়েছে!');
      setContents(contents.filter(c => c.id !== id));
    }
  };

  // Delete handlers
  const handleDeleteGrade = async (id: number) => {
    if (!window.confirm('আপনি কি নিশ্চিতভাবে এই Grade ডিলিট করতে চান? এর সাথে সংশ্লিষ্ট সব Subject, Chapter, Content ডিলিট হবে!')) return;
    // ক্যাসকেড ডিলিট (ম্যানুয়াল)
    const { data: subjRows } = await supabase.from('subjects').select('id').eq('grade_id', id);
    const { data: chapterRows } = await supabase.from('chapters').select('id').eq('grade_id', id);
    const chapterIds = (chapterRows || []).map(r => r.id);
    if (chapterIds.length > 0) {
      await supabase.from('contents').delete().in('chapter_id', chapterIds);
    }
    await supabase.from('chapters').delete().eq('grade_id', id);
    await supabase.from('subjects').delete().eq('grade_id', id);
    await supabase.from('grades').delete().eq('id', id);
    // লোকাল স্টেট আপডেট
    setGrades(grades.filter(g => g.id !== id));
    setSubjects(subjects.filter(s => s.grade_id !== id));
    setChapters(chapters.filter(c => c.grade_id !== id));
    setContents(contents.filter(c => !chapterIds.includes((c.chapter_id as number) || -1)));
  };
  const handleDeleteSubject = async (id: number) => {
    if (!window.confirm('আপনি কি নিশ্চিতভাবে এই Subject ডিলিট করতে চান? এর সাথে সংশ্লিষ্ট সব Chapter, Content ডিলিট হবে!')) return;
    const { data: chapterRows } = await supabase.from('chapters').select('id').eq('subject_id', id);
    const chapterIds = (chapterRows || []).map(r => r.id);
    if (chapterIds.length > 0) {
      await supabase.from('contents').delete().in('chapter_id', chapterIds);
    }
    await supabase.from('chapters').delete().eq('subject_id', id);
    await supabase.from('subjects').delete().eq('id', id);
    setSubjects(subjects.filter(s => s.id !== id));
    setChapters(chapters.filter(c => c.subject_id !== id));
    setContents(contents.filter(c => !chapterIds.includes((c.chapter_id as number) || -1)));
  };
  const handleDeleteChapter = async (id: number) => {
    if (!window.confirm('আপনি কি নিশ্চিতভাবে এই Chapter ডিলিট করতে চান? এর সাথে সংশ্লিষ্ট সব Content ডিলিট হবে!')) return;
    await supabase.from('contents').delete().eq('chapter_id', id);
    await supabase.from('chapters').delete().eq('id', id);
    setChapters(chapters.filter(c => c.id !== id));
    setContents(contents.filter(c => (c.chapter_id as number) !== id));
  };

  // Nested structure তৈরি
  const gradesWithSubjectsAndChapters = grades.map(grade => {
    const gradeSubjects = subjects.filter(s => s.grade_id === grade.id);
    return {
      ...grade,
      subjects: gradeSubjects.map(subject => ({
        ...subject,
        chapters: chapters.filter(c => c.grade_id === grade.id && c.subject_id === subject.id).map(chapter => ({
          ...chapter,
          contents: contents.filter(content => content.chapter_id === chapter.id),
        })),
      })),
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" /> Home
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-semibold text-lg">EduPlay Admin</span>
              <span className="text-xs opacity-80">Full Access</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
              <Settings className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Structured Content Management */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Content Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gradesWithSubjectsAndChapters.map(grade => (
              <div key={grade.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <button
                    className="flex-1 flex items-center text-left text-xl font-bold text-eduplay-purple focus:outline-none"
                    onClick={() => setOpenGradeId(openGradeId === grade.id ? null : grade.id)}
                  >
                    <span>{grade.name}</span>
                    {openGradeId === grade.id ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
                  </button>
                  <button onClick={() => handleDeleteGrade(grade.id)} className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition" title="Delete Grade">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {openGradeId === grade.id && (
                  <div className="pl-2">
                    {grade.subjects.length === 0 ? (
                      <div className="text-gray-400 italic py-2">No subjects</div>
                    ) : (
                      grade.subjects.map(subject => (
                        <div key={subject.id} className="mb-2">
                          <div className="flex items-center justify-between">
                            <button
                              className="flex-1 flex items-center text-left text-lg font-semibold text-blue-700 py-1 focus:outline-none"
                              onClick={() => setOpenSubjectId(openSubjectId === subject.id ? null : subject.id)}
                            >
                              <span>{subject.name}</span>
                              {openSubjectId === subject.id ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                            </button>
                            <button onClick={() => handleDeleteSubject(subject.id)} className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition" title="Delete Subject">
                              <Trash2 className="w-4 h-4" />
                            </button>
                </div>
                          {openSubjectId === subject.id && (
                            <div className="pl-4">
                              {subject.chapters.length === 0 ? (
                                <div className="text-gray-400 italic py-1">No chapters</div>
                              ) : (
                                <ul className="space-y-1">
                                  {subject.chapters.map(chapter => (
                                    <li key={chapter.id} className="bg-blue-50 rounded-lg px-3 py-2 mb-1 shadow-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-blue-900">{chapter.name}</span>
                                        <button onClick={() => handleDeleteChapter(chapter.id)} className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition" title="Delete Chapter">
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                </div>
                                      {/* Content List */}
                                      {chapter.contents.length === 0 ? (
                                        <div className="text-gray-400 italic py-1 pl-2">No content</div>
                                      ) : (
                                        <ul className="pl-2 mt-1 space-y-1">
                                          {chapter.contents.map(content => (
                                            <li key={content.id} className="flex items-center justify-between bg-white rounded px-2 py-1 shadow border border-gray-100">
                                              <span className="text-gray-800 text-sm font-semibold">{content.title}</span>
                                              <span className="flex gap-1">
                                                <button onClick={() => handleEditContent(content)} className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition" title="Edit">
                                                  <Pencil className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteContent(content.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition" title="Delete">
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                  </div>
                          )}
                        </div>
                      ))
                    )}
                      </div>
                )}
                    </div>
                  ))}
                </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10" />

        {/* Content Form */}
        <section className="max-w-2xl mx-auto bg-white rounded-xl shadow border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">{editingId ? 'কনটেন্ট এডিট করুন' : 'নতুন কনটেন্ট যোগ করুন'}</h3>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(editingId ? handleUpdateContent : onSubmit)} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="title" className="font-semibold mb-1">Title</Label>
                <input id="title" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Title" {...register('title')} />
                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title.message}</div>}
              </div>
              <div className="col-span-2">
                <Label htmlFor="description" className="font-semibold mb-1">Description</Label>
                <textarea
                  id="description"
                  className="border border-gray-300 p-2 rounded w-full resize-none overflow-hidden focus:ring-2 focus:ring-blue-200"
                  placeholder="Description"
                  {...register('description')}
                  rows={2}
                  onInput={e => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description.message}</div>}
              </div>
              <div>
                <Label htmlFor="content_type" className="font-semibold mb-1">Content Type</Label>
                <select id="content_type" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('content_type')}>
                  <option value="youtube">YouTube</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <Label htmlFor="youtube_link" className="font-semibold mb-1">YouTube Link</Label>
                <input id="youtube_link" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="YouTube Link" {...register('youtube_link')} />
          </div>
              <div className="col-span-2">
                <Label htmlFor="file_url" className="font-semibold mb-1">File URL</Label>
                <input id="file_url" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="File URL" {...register('file_url')} />
                    </div>
              {/* Grade Dropdown */}
              <div className="col-span-1 flex items-center gap-2">
                <Label htmlFor="grade_id" className="font-semibold mb-1">Grade</Label>
                <select id="grade_id" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('grade_id', { valueAsNumber: true })}>
                  <option value="">ক্লাস নির্বাচন করুন</option>
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                <Button type="button" size="icon" variant="outline" onClick={() => setShowGradeModal(true)}><Plus className="w-4 h-4" /></Button>
                    </div>
              {/* Subject Dropdown */}
              <div className="col-span-1 flex items-center gap-2">
                <Label htmlFor="subject_id" className="font-semibold mb-1">Subject</Label>
                <select id="subject_id" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('subject_id', { valueAsNumber: true })} disabled={!selectedGradeId}>
                  <option value="">বিষয় নির্বাচন করুন</option>
                  {filteredSubjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <Button type="button" size="icon" variant="outline" onClick={() => { setModalGradeId(selectedGradeId); setShowSubjectModal(true); }} disabled={!selectedGradeId}><Plus className="w-4 h-4" /></Button>
                  </div>
              {/* Chapter Dropdown */}
              <div className="col-span-2 flex items-center gap-2">
                <Label htmlFor="chapter_id" className="font-semibold mb-1">Chapter</Label>
                <select id="chapter_id" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('chapter_id', { valueAsNumber: true })} disabled={!selectedGradeId || !selectedSubjectId}>
                  <option value="">চ্যাপ্টার নির্বাচন করুন</option>
                  {filteredChapters.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <Button type="button" size="icon" variant="outline" onClick={() => { setModalChapterGradeId(selectedGradeId); setModalChapterSubjectId(selectedSubjectId); setShowChapterModal(true); }} disabled={!selectedGradeId || !selectedSubjectId}><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="col-span-2 mt-4 flex gap-2">
                <Button type="submit" className="bg-blue-600 text-white w-full py-3 text-lg font-bold rounded-lg shadow hover:bg-blue-700 transition">{editingId ? 'Update Content' : 'Add Content'}</Button>
                {editingId && (
                  <Button type="button" variant="outline" className="w-full py-3 text-lg font-bold rounded-lg" onClick={() => { setEditingId(null); reset({ grade_id: undefined, subject_id: undefined, chapter_id: undefined, title: '', description: '', content_type: 'youtube', youtube_link: '', file_url: '' }); }}>Cancel</Button>
                )}
                </div>
            </form>
          </FormProvider>
        </section>

        {/* Grade Modal */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
              <h4 className="font-bold mb-4 text-lg">নতুন ক্লাস যোগ করুন</h4>
              <form onSubmit={handleAddGrade} className="flex gap-2">
                <input className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Grade Name" value={newGrade} onChange={e => setNewGrade(e.target.value)} />
                <Button type="submit" className="bg-blue-600 text-white">Add</Button>
              </form>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowGradeModal(false)}>Cancel</Button>
                </div>
                </div>
        )}
        {/* Subject Modal */}
        {showSubjectModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
              <h4 className="font-bold mb-4 text-lg">নতুন বিষয় যোগ করুন</h4>
              <form onSubmit={handleAddSubject} className="flex gap-2">
                <input className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Subject Name" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
                <Button type="submit" className="bg-blue-600 text-white">Add</Button>
              </form>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowSubjectModal(false)}>Cancel</Button>
                </div>
          </div>
        )}
        {/* Chapter Modal */}
        {showChapterModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
              <h4 className="font-bold mb-4 text-lg">নতুন চ্যাপ্টার যোগ করুন</h4>
              <form onSubmit={handleAddChapter} className="flex gap-2">
                <input className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Chapter Name" value={newChapter} onChange={e => setNewChapter(e.target.value)} />
                <Button type="submit" className="bg-blue-600 text-white">Add</Button>
              </form>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowChapterModal(false)}>Cancel</Button>
        </div>
      </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
