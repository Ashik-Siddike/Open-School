import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    grade: '',
    avatar_url: '',
    address: '',
    gender: '',
    bio: '',
  });
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (!data.user) {
        navigate('/login');
        return;
      }
      // প্রোফাইল টেবিল থেকে ডেটা আনুন
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      if (profileData) {
        setProfile({
          name: profileData.name || '',
          age: profileData.age || '',
          grade: profileData.grade || '',
          avatar_url: profileData.avatar_url || '',
          address: profileData.address || '',
          gender: profileData.gender || '',
          bio: profileData.bio || '',
        });
      }
      // ক্লাস/গ্রেড লোড করুন
      const { data: gradesData } = await supabase
        .from('grades')
        .select('name');
      setGrades(gradesData || []);
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // প্রোফাইল ছবি আপলোড
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}.${fileExt}`;
    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      setError('ছবি আপলোড ব্যর্থ!');
      return;
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    setProfile({ ...profile, avatar_url: data.publicUrl });
  };

  // প্রোফাইল সেভ
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    const updates = {
      id: user.id,
      ...profile,
      updated_at: new Date(),
    };
    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) setError('প্রোফাইল সেভ ব্যর্থ!');
    else setSuccess('প্রোফাইল সেভ হয়েছে!');
    setSaving(false);
  };

  if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">প্রোফাইল</h2>
      <form onSubmit={handleSave} className="bg-white p-6 rounded shadow-md space-y-4">
        <div className="flex flex-col items-center">
          <img
            src={profile.avatar_url || 'https://ui-avatars.com/api/?name=' + (profile.name || 'User')}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2 border"
          />
          <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
        </div>
        <div>
          <label className="block mb-1 font-medium">নাম</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">বয়স</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="w-full border rounded p-2"
            min="1"
            max="100"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">ক্লাস</label>
          <select
            name="grade"
            value={profile.grade}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- ক্লাস নির্বাচন করুন --</option>
            {grades.map((g) => (
              <option key={g.name} value={g.name}>{g.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">ঠিকানা</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="ঠিকানা"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">লিঙ্গ</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="male">ছেলে</option>
            <option value="female">মেয়ে</option>
            <option value="other">অন্যান্য</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">বায়ো</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="নিজের সম্পর্কে সংক্ষেপে লিখুন"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          disabled={saving}
        >
          {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
      </form>
    </div>
  );
};

export default Profile; 