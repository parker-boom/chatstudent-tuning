'use client';
import { useState } from 'react';
import { usePersistentState } from '@/hooks/usePersistentState';
import { X } from 'lucide-react';

export default function ClassModal({ onAdd, onClose, defaultValues = {} }) {
  const [title, setTitle] = useState(defaultValues.title || '');
  const [courseNumber, setCourseNumber] = useState(defaultValues.courseNumber || '');
  const [description, setDescription] = useState(defaultValues.description || '');  
  const [grade] = usePersistentState('onboarding_grade', 10);

  const isCollegeOrAbove = grade > 12;

  const handleConfirm = () => {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      courseNumber: courseNumber.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center">
      <div className="relative bg-bubble text-main w-full max-w-md mx-auto rounded-xl p-6 shadow-[0_0_20px_rgba(255,255,255,0.08)] space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sub hover:text-main transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center">Add a Class</h2>

        {/* Class Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-sub">Class Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Introduction to Psychology"
            className="w-full bg-background rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
          />
        </div>

        {/* Course Number (college+) */}
        {isCollegeOrAbove && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-sub">
              Course Number <span className="opacity-60 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              placeholder="PSY 101"
              className="w-full bg-background rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
            />
          </div>
        )}

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-sub">
            Describe the course in 1 sentence
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Overviews the basics of psych: memory, important people, methods of study, application, etc."
            maxLength={100}
            rows={2}
            className="w-full resize-none bg-background rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
          />
          <p className="text-xs text-sub text-right">
            {description.length}/100 characters
          </p>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={!title.trim()}
          className={`w-full mt-4 py-3 rounded-lg font-semibold transition ${
            title.trim()
              ? 'bg-button text-background hover:opacity-90'
              : 'bg-icon text-sub cursor-not-allowed'
          }`}
        >
          Add Class
        </button>
      </div>
    </div>
  );
}
