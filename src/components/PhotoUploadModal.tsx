import React, { useState, useRef } from 'react';
import { Camera, UploadCloud, Link as LinkIcon, Check, X, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { useToast } from './Toast';
import jayedPhoto from '../assets/jayed.jpg';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl: string;
  onPhotoUpdated: (newUrl: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  currentPhotoUrl,
  onPhotoUpdated,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('অনুগ্রহ করে একটি ইমেজ ফাইল নির্বাচন করুন (.jpg, .png, .webp)', 'error');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showToast('ছবি ১৫MB এর চেয়ে ছোট হতে হবে', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      showToast('অনুগ্রহ করে একটি ছবির লিংক দিন', 'error');
      return;
    }
    setPreviewUrl(urlInput.trim());
  };

  const handleSavePhoto = async () => {
    const finalUrl = previewUrl || urlInput.trim();
    if (!finalUrl) return;

    setIsSaving(true);
    try {
      // 1. Save to localStorage for instant persistence
      localStorage.setItem('jayed_photo_url', finalUrl);
      localStorage.setItem('jayed_photo_version', 'custom_user_upload');

      // 2. Dispatch custom event for all components
      window.dispatchEvent(new CustomEvent('jayed-photo-changed', { detail: finalUrl }));
      onPhotoUpdated(finalUrl);

      // 3. Try saving to backend disk if base64
      if (finalUrl.startsWith('data:image')) {
        try {
          await fetch('/api/save-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: finalUrl }),
          });
        } catch (err) {
          console.warn('Backend disk save skipped:', err);
        }
      }

      showToast('নতুন ছবি ওয়েবসাইটে সফলভাবে যুক্ত হয়েছে!', 'success');
      onClose();
    } catch (err: any) {
      console.error('Error saving photo:', err);
      showToast(err?.message || 'ছবি সেভ করতে সমস্যা হয়েছে', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    setIsSaving(true);
    try {
      localStorage.removeItem('jayed_photo_url');
      localStorage.setItem('jayed_photo_version', 'july_photo_2026_v2');

      window.dispatchEvent(new CustomEvent('jayed-photo-changed', { detail: jayedPhoto }));
      onPhotoUpdated(jayedPhoto);
      setPreviewUrl(null);
      setUrlInput('');

      showToast('অফিসিয়াল জুলাই ফটো রিস্টোর করা হয়েছে!', 'info');
      onClose();
    } catch (err: any) {
      console.error('Error resetting photo:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                পোর্টফোলিও ছবি পরিবর্তন ও আপলোড
              </h3>
              <p className="text-xs text-slate-400">
                আপনার পছন্দের ছবি নির্বাচন করে ওয়েবসাইটে যুক্ত করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-5">
          {/* Photo Preview Grid */}
          <div className="flex items-center justify-center gap-6">
            {/* Current Active Photo */}
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                বর্তমান ছবি
              </span>
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-md mx-auto">
                <img
                  src={currentPhotoUrl}
                  alt="Current MD Jayed"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Arrow or Separator */}
            {(previewUrl || urlInput) && (
              <div className="text-sky-400 text-lg font-bold">➔</div>
            )}

            {/* New Preview Photo (if selected) */}
            {(previewUrl || urlInput) && (
              <div className="text-center space-y-2 animate-in zoom-in-95">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  নতুন প্রিভিউ
                </span>
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-sky-400 bg-slate-950 shadow-md shadow-sky-500/20 mx-auto">
                  <img
                    src={previewUrl || urlInput}
                    alt="New Preview"
                    onError={(e) => {
                      e.currentTarget.src = currentPhotoUrl;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>ডিভাইস থেকে ফাইল আপলোড</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'url'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>ছবির লিংক (URL)</span>
            </button>
          </div>

          {activeTab === 'upload' ? (
            /* Upload Dropzone / Button */
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed ${
                  isDragging ? 'border-sky-400 bg-sky-500/10' : 'border-slate-700 hover:border-sky-400/70 bg-slate-950/60 hover:bg-slate-800/40'
                } p-5 rounded-2xl text-center cursor-pointer transition-all group`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white mb-1">
                  ক্লিক করে ডিভাইস থেকে ছবি বাছাই করুন
                </p>
                <p className="text-[11px] text-slate-400">
                  সাপোর্ট করে: .JPG, .PNG, .WEBP (ড্র্যাগ অ্যান্ড ড্রপও করতে পারবেন)
                </p>
              </div>
            </div>
          ) : (
            /* URL Input Field */
            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium block">
                ইন্টারনেট থেকে ছবির সরাসরি লিংক (Direct Image URL):
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold rounded-xl transition-colors"
                >
                  প্রিভিউ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            disabled={isSaving}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            title="মূল জুলাই মাসের ছবি ফিরিয়ে আনুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>অরিজিনাল ছবি</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              বাতিল
            </button>
            <button
              type="button"
              disabled={(!previewUrl && !urlInput) || isSaving}
              onClick={handleSavePhoto}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                (previewUrl || urlInput) && !isSaving
                  ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'ছবি যুক্ত করুন'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
