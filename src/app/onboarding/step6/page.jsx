'use client';
import PreferenceToggle from '@/components/PreferenceToggle';
import PreferenceSlider from '@/components/PreferenceSlider';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useRouter } from 'next/navigation';
import ChatInputBar from '@/components/ChatInputBar';

export default function Step6() {
  const router = useRouter();
  const [avoidText, setAvoidText] = usePersistentState('onboarding_avoid', '');

  const handleSubmit = () => {
    router.push('/onboarding/step7');
  };

  return (
    <div className="relative w-full px-6 pb-24">
    <div className="flex flex-col items-center w-full space-y-6">

      <div className="pb-2">
        <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow text-main items-center space-y-2">
          <div className="text-xl font-bold">What should my personality generally be?</div>
          <div className="text-md font-semibold text-sub">
            This will help me know how to act across the board.
          </div>
        </div>
      </div>

      <div className="bg-bubble rounded-xl shadow px-5 py-6 max-h-[54vh] overflow-y-auto space-y-4 scrollbar-hide">

        {/* General improvement opt-in */}
        <PreferenceToggle
          label="Include helpful traits to improve my performance?"
          sublabel="These are things that make conversations better across the board."
          storageKey="prefs_general_helpfulness"
        />

        <div className="space-y-4 text-left">

          {/* All Preference Inputs */}
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
      </div>
    </div>

    {/* Fixed chat box at bottom */}
    <ChatInputBar
      value="Here are my preferences!"
      editable={false}
      onSubmit={handleSubmit}
    />
    </div>
  );
}
