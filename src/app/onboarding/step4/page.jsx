'use client';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatInputBar from '@/components/ChatInputBar';
import { Plus } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import ClassModal from '@/components/ClassModal';
import { Pencil, Trash2 } from 'lucide-react';


const COLORS = [
  '#F7C8C8', // pastel red
  '#FFE5B4', // pastel orange
  '#FFFACD', // pastel yellow
  '#D0F0C0', // pastel green
  '#B3E5FC', // pastel blue
  '#D1C4E9', // pastel purple
  '#F8BBD0', // pastel pink
  '#E0E0E0', // soft gray
  '#C8E6C9', // pastel mint
];


export default function Step4() {
  const [classes, setClasses] = usePersistentState('onboarding_classes', []);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [editClassId, setEditClassId] = useState(null);

  const handleEdit = (id) => {
    setEditClassId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };  

  const handleAddClassConfirmed = (data) => {
    if (editClassId) {
      setClasses(
        classes.map((cls) =>
          cls.id === editClassId ? { ...cls, ...data } : cls
        )
      );
    } else {
      const newClass = {
        id: uuid(),
        ...data,
        color: availableColors[Math.floor(Math.random() * availableColors.length)],
      };
      setClasses([...classes, newClass]);
    }
    setShowModal(false);
    setEditClassId(null);
  };  

  const availableColors = COLORS.filter(
    (c) => !classes.map((cls) => cls.color).includes(c)
  );

  const handleAddClass = () => {
    if (classes.length >= 9) return;

    const newClass = {
      id: uuid(),
      title: `Class ${classes.length + 1}`,
      courseNumber: '',
      description: '',
      color: availableColors[Math.floor(Math.random() * availableColors.length)],
    };

    setClasses([...classes, newClass]);
  };

  const handleSubmit = () => router.push('/onboarding/step5');

  const previewText =
    classes.length === 0
      ? "I don't want to specify my classes."
      : `Here are the ${classes.length} classes I’m in.`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {showModal && (
        <ClassModal
          onAdd={handleAddClassConfirmed}
          onClose={() => {
            setShowModal(false);
            setEditClassId(null);
          }}
          defaultValues={
            editClassId ? classes.find((cls) => cls.id === editClassId) : {}
          }
        />
      )}

      <div className="flex justify-center w-full px-6 pb-28">
        <div className="w-full max-w-xl space-y-4 text-center">

          <div className="pb-8">

            <div className="pb-2">
              <img src="/images/onboarding/step4.png" alt="Step 4" className="w-full h-[150px] object-contain" loading="eager" />
            </div>

            <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow text-main space-y-2">
              <div className="text-xl font-bold">What classes are you in?</div>
              <div className="text-md font-semibold text-sub">
                You can just add the ones we will chat about.
              </div>
            </div>
          </div>

          {/* Scrollable class list */}
          <div className="bg-bubble rounded-xl shadow px-4 py-3 max-h-52 overflow-y-auto space-y-3 scrollbar-hide">
            {classes.length === 0 ? (
              <p className="text-sub text-sm text-left">No classes added yet.</p>
            ) : (
              classes.map((cls) => (
                <div
                  key={cls.id}
                  className="w-full rounded-lg px-4 py-2 flex justify-between items-start shadow-sm"
                  style={{ backgroundColor: cls.color }}
                >
                  <div className="text-left text-base font-semibold text-black leading-tight flex items-center h-full">
                    <span>
                      {cls.title}
                      {cls.courseNumber && (
                        <span className="font-normal opacity-70"> ({cls.courseNumber})</span>
                      )}
                    </span>
                  </div>


                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => handleEdit(cls.id)}
                      className="p-1 text-black/70 hover:text-black transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="p-1 text-black/70 hover:text-black transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))              
            )}
          </div>

          {/* Add class button */}
          <div className="flex justify-center">
          <button
              onClick={() => setShowModal(true)}
              disabled={classes.length >= 6}
              className="flex items-center gap-2 bg-button text-background px-4 py-2 rounded-lg font-medium hover:opacity-80 transition disabled:opacity-30"
            >
              <Plus size={18} />
              Add Class
            </button>
          </div>
        </div>
      </div>

      <ChatInputBar
        value={previewText}
        editable={false}
        onSubmit={handleSubmit}
      />
    </>
  );
}
