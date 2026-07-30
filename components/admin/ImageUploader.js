'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ImageUploader({ value, onChange, folder = 'packages' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('media').upload(path, file);

    if (uploadError) {
      setError('Upload failed. Try again.');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 mb-2 bg-gray-100 dark:bg-mokara-dark">
          <Image src={value} alt="" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : null}

      <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:border-mokara-orange hover:text-mokara-orange transition-colors">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
          disabled={uploading}
        />
      </label>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
