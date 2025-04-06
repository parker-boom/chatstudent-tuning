'use client';
import PreferenceToggle from '@/components/PreferenceToggle';
import PreferenceSlider from '@/components/PreferenceSlider';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatInputBar from '@/components/ChatInputBar';

export default function Step6() {
  const router = useRouter();
  const [avoidText, setAvoidText] = usePersistentState('onboarding_avoid', '');

  const handleSubmit = () => {
    router.push('/onboarding/step7');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handleSubmit();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full px-4 pb-8 pt-4 flex flex-col items-center gap-4">
      {/* Fixed height intro box */}
      <div className="bg-bubble px-6 py-5 rounded-xl shadow text-main w-full max-w-xl space-y-2">
        <div className="text-xl font-bold">What should my personality generally be?</div>
        <div className="text-md font-semibold text-sub">
          This will help me know how to act across the board.
        </div>
      </div>

      {/* Scrollable preferences */}
      <div className="bg-bubble rounded-xl shadow px-5 py-6 w-full max-w-xl flex-grow overflow-y-auto max-h-[calc(85vh-280px)] scrollbar-hide space-y-4">
        <PreferenceToggle
          label="Include helpful traits to improve my performance?"
          sublabel="Things that make conversations better overall."
          storageKey="prefs_general_helpfulness"
        />

        <PreferenceToggle
          label="Do you prefer I focus on 1 idea instead of many?"
          storageKey="prefs_focus_style"
        />

        <PreferenceToggle
          label="Do you want me to use emojis?"
          storageKey="prefs_emojis"
        />

        <PreferenceToggle
          label="Should I use tables & lists, to format more?"
          storageKey="prefs_formatting"
        />

        <PreferenceSlider
          label="How direct should I be?"
          leftLabel="Not at All"
          rightLabel="Very"
          storageKey="prefs_bluntness"
        />

        <PreferenceSlider
          label="How stubborn should I be?"
          leftLabel="Not at All"
          rightLabel="Very"
          storageKey="prefs_assertiveness"
        />

        <PreferenceSlider
          label="How emotionally supportive should I be?"
          leftLabel="Not at All"
          rightLabel="Very"
          storageKey="prefs_empathy"
        />

        <PreferenceSlider
          label="How long should my responses be?"
          leftLabel="Very Short"
          rightLabel="Very Long"
          storageKey="prefs_length"
        />

        <PreferenceSlider
          label="How creative & out there should I get?"
          leftLabel="Not at all"
          rightLabel="Very"
          storageKey="prefs_creativity"
        />

        <PreferenceSlider
          label="How often should I lead the conversation?"
          leftLabel="Never"
          rightLabel="Always"
          storageKey="prefs_leadership"
        />

        <PreferenceSlider
          label="Should I use these preferences?"
          leftLabel="Only when Useful"
          rightLabel="Always"
          storageKey="prefs_rigidity"
        />

        <div className="bg-background rounded-xl shadow px-5 py-4">
          <label className="text-sm font-medium text-sub block mb-2">
            Is there anything Chat should avoid doing?
          </label>
          <textarea
            value={avoidText}
            onChange={(e) => setAvoidText(e.target.value)}
            placeholder="Don’t bring up mental health."
            className="w-full bg-bubble rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow text-sm"
            rows={3}
          />
        </div>
      </div>

      <ChatInputBar
        value="Here are my preferences!"
        editable={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
