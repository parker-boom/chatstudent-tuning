'use client';
import { useState, useEffect } from 'react';
import ChatInputBar from '@/components/ChatInputBar';
import EditableList from '@/components/EditableList';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useRouter } from 'next/navigation';

export default function Step5() {
  const router = useRouter();

  const [personalityRest, setPersonalityRest] = usePersistentState(
    'onboarding_personality_note',
    ''
  );

  // Refresh from localStorage
  const refreshActivityData = () => {
    const a = JSON.parse(localStorage.getItem('onboarding_activities') || '[]');
    const i = JSON.parse(localStorage.getItem('onboarding_interests') || '[]');
    setActivities(a);
    setInterests(i);
  };


  const [activities, setActivities] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const a = JSON.parse(localStorage.getItem('onboarding_activities') || '[]');
      const i = JSON.parse(localStorage.getItem('onboarding_interests') || '[]');
      setActivities(a);
      setInterests(i);
    }
  }, []);

  const confirmedCount = (list) => list.filter((item) => item.confirmed).length;

  const handleSubmit = () => {
    router.push('/onboarding/step6');
  };

  const hasActivities = confirmedCount(activities) > 0;
  const hasInterests = confirmedCount(interests) > 0;
  const hasPersonality = personalityRest.trim().length > 0;

  let previewText = '';
  if (!hasActivities && !hasInterests) {
    previewText = `I don't want to specify my activities or interests.`;
  } else {
    const parts = [];
    if (hasActivities) parts.push(`Here's ${confirmedCount(activities)} of my activities`);
    if (hasInterests) parts.push(`these are ${confirmedCount(interests)} of my interests`);
    previewText = parts.join(' and ') + '.';
  }

  if (hasPersonality) {
    previewText += ` Also remember this about who I am!`;
  }

  return (
    <>
      <div className="flex justify-center w-full px-6 pb-20">
        <div className="w-full max-w-xl space-y-6 text-center">

          <div className="pb-8">

            <div className="pb-2">
              <img src="/images/onboarding/step5.png" alt="Step 5" className="w-full h-[150px] object-contain" />
            </div>

            <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow text-main space-y-2">
              <div className="text-xl font-bold">What do you do outside of school?</div>
              <div className="text-md font-semibold text-sub">
                This can be anything! Sports & clubs, but even your favorite color.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
              <h3 className="text-md text-sub font-bold">Activities & Talents</h3>
              <EditableList
                storageKey="onboarding_activities"
                placeholderOptions={[
                  'Captain of robotics team',
                  'Varsity soccer goalie',
                  'Performs slam poetry',
                  'Runs community tutoring',
                  'Competes in coding olympiads',
                  'Leads environmental club',
                ]}
                onChange={refreshActivityData}
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-md text-sub font-bold">Interests & Favorites</h3>
              <EditableList
                storageKey="onboarding_interests"
                placeholderOptions={[
                  'Huge fan of Avatar: The Last Airbender',
                  'Loves making playlists',
                  'Into digital art & animation',
                  'Bakes every weekend',
                  'Reads fantasy novels',
                  'Knows every Spongebob quote',
                ]}
                onChange={refreshActivityData}
              />
            </div>
          </div>

          {/* Personality sentence */}
          <div className="space-y-2 text-left pt-2">
            <label className="text-sub text-md font-semibold">
              Anything else important to know?
            </label>
            <input
              type="text"
              value={`${personalityRest}`}
              onChange={(e) => {
                const text = e.target.value;
                if (text.startsWith("I'm someone ")) {
                  setPersonalityRest(text.slice("I'm someone ".length));
                } else {
                  setPersonalityRest(text);
                }
              }}
                className="w-full bg-bubble rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
              placeholder="I love to talk and come up with big ideas."
            />
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
