'use client';
import { useRouter } from 'next/navigation';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useEffect, useState } from 'react';
import ChatInputBar from '@/components/ChatInputBar';

const gradeLabels = {
  5: '5th Grade', 6: '6th Grade', 7: '7th Grade', 8: '8th Grade',
  9: 'High School Freshman', 10: 'High School Sophomore',
  11: 'High School Junior', 12: 'High School Senior',
  13: 'College Freshman', 14: 'College Sophomore',
  15: 'College Junior', 16: 'College Senior',
  17: 'Graduate Student',
};

const gradeGroups = [
  { emoji: '🧒', label: 'Elementary', range: [5] },
  { emoji: '👦', label: 'Middle School', range: [6, 7, 8] },
  { emoji: '📚', label: 'High School', range: [9, 10, 11, 12] },
  { emoji: '💻', label: 'College', range: [13, 14, 15, 16] },
  { emoji: '🎓', label: 'Graduate', range: [17] },
];

const grades = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function Step2() {
  const [grade, setGrade] = usePersistentState('onboarding_grade', 8);
  const router = useRouter();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent((grades.indexOf(grade) / (grades.length - 1)) * 100);
  }, [grade]);

  const handleSliderChange = (e) => {
    setGrade(grades[parseInt(e.target.value)]);
  };

  const handleNumberClick = (num) => setGrade(num);
  const handleSubmit = () => router.push('/onboarding/step3');

  const currentGroup = gradeGroups.find(g => g.range.includes(grade));
  const previewText = grade > 8
    ? `I'm a ${gradeLabels[grade]}.`
    : `I'm a ${gradeLabels[grade]} student.`;

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
      <div className="flex justify-center w-full px-6 pb-28">
        <div className="w-full max-w-xl space-y-6 text-center">

          <div className="pb-10">
            <div className="pb-2">
              <img src="/images/onboarding/step2.png" alt="Step 2" className="w-full h-[150px] object-contain" />
            </div>

            <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow text-main space-y-2">
              <div className="text-xl font-bold">What grade are you in?</div>
              <div className="text-md font-semibold text-sub">
                This helps me tailor your learning to the right level.
              </div>
            </div>
          </div>

          {/* Slider Container */}
          <div className="bg-bubble rounded-full py-6 px-8 shadow relative w-full">
            {/* Group Label */}
            <div className="text-xl font-bold text-main -mt-3 mb-6">
              {currentGroup.emoji} {currentGroup.label}
            </div>

            <div className="relative w-full">
              {/* Invisible Range Slider */}
              <input
                type="range"
                min="0"
                max={grades.length - 1}
                step="1"
                value={grades.indexOf(grade)}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {/* Slider Track */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-sub opacity-30 rounded-full transform -translate-y-1/2 z-0" />

              {/* Slider Handle */}
              <div
                className="absolute top-1/2 pointer-events-none z-20 w-10 h-10 bg-button text-background rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-200"
                style={{ left: `${percent}%`, transform: 'translate(-50%, -50%)' }}
              >
                {grade}
              </div>

              {/* Grade Numbers */}
              <div className="absolute inset-0 flex justify-between items-center px-2 z-30">
                {grades.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className={`text-xs font-medium transition ${
                      num === grade ? 'opacity-0' : 'text-sub opacity-80 hover:opacity-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
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
