'use client';
import { useRouter } from 'next/navigation';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useIsHydrated } from '@/hooks/useIsHydrated';
import ChatInputBar from '@/components/ChatInputBar';

export default function Step3() {
  const [schoolName, setSchoolName] = usePersistentState('onboarding_school', '');
  const [studyFocus, setStudyFocus] = usePersistentState('onboarding_study', '');
  const [grade] = usePersistentState('onboarding_grade', 10);
  const isHydrated = useIsHydrated();
  const router = useRouter();

  const isCollegeOrAbove = grade >= 13;
  const levelName =
    grade >= 13
      ? 'college'
      : grade >= 9
      ? 'high school'
      : grade >= 6
      ? 'middle school'
      : 'school';

  const handleSubmit = () => {
    if (!schoolName.trim()) return;
    router.push('/onboarding/step4');
  };

  const summaryText =
    `I go to school at ${schoolName || '...'}` +
    (isCollegeOrAbove && studyFocus.trim()
      ? ` and I study ${studyFocus.trim()}.`
      : '.');

  return (
    <>
      <div className="flex items-center justify-center w-full px-4 pb-28">
        <div className="w-full max-w-xl space-y-6 text-center">
        

          {/* Prompt Bubble */}
          <div className="pb-8">
            <div className="pb-2">
              <img src="/images/onboarding/step3.png" alt="Step 3" className="w-full h-[150px] object-contain" />
            </div>
            <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow text-main text-center space-y-2">
              <div className="text-xl font-bold">Now let's get specific.</div>
              <div className="text-md font-semibold text-sub">
                In case you ever need to panic check late policies at 1am.
              </div>
            </div>
          </div>

          {/* Label + Input: School Name */}
          <div className="space-y-2 text-left">
            <label className="text-sub text-sm font-semibold">
              What is the name of your {levelName}?
            </label>
            <input
              type="text"
              placeholder="Enter your school name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full bg-bubble rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
            />
          </div>

          {/* Input: Study Focus (if college+) */}
          {isCollegeOrAbove && (
            <div className="space-y-2 text-left">
              <label className="text-sub text-sm font-semibold">
                What are you studying?
              </label>
              <input
                type="text"
                placeholder="Mention your major, focuses, and minors"
                value={studyFocus}
                onChange={(e) => setStudyFocus(e.target.value)}
                className="w-full bg-bubble rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
              />
            </div>
          )}
        </div>
      </div>

      <ChatInputBar
        value={summaryText}
        editable={false}
        onSubmit={handleSubmit}
        disabled={!schoolName.trim()}
      />
    </>
  );
}
