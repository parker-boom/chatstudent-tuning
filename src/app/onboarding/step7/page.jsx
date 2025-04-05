'use client';
import { useState } from 'react';
import ChatInputBar from '@/components/ChatInputBar';
import { ClipboardCheck, ClipboardCopy } from 'lucide-react';
import { useGenerateCustomInstructions } from '@/hooks/useGenerateCustomInstructions';
import { useRouter } from 'next/navigation';

export default function Step7() {
  const { traits, about } = useGenerateCustomInstructions();
  const [copied, setCopied] = useState({ traits: false, about: false });
  const router = useRouter();

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 1000);
  };

  const handleSubmit = () => {
    router.push('/onboarding/step8');
  };

  return (
    <>
      <div className="flex justify-center w-full px-6 pb-20">
        <div className="w-full max-w-3.5xl space-y-6 text-center">
          {/* Title */}
          <div className="pb-6">
            <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow">
              <div className="text-main text-xl font-bold">
                All done, let's update!
              </div>
              <div className="text-md font-semibold text-sub">
                Please follow the instructions below.
              </div>
            </div>
          </div>

          {/* Instructions with image */}
          <div className="flex items-start justify-center gap-4">
            <div className="bg-bubble px-3 py-3 rounded-xl shadow text-left max-w-xl">
              <img src="/images/onboarding/step7.png" alt="Step 1" className="h-[138px] object-contain" />
            </div>

            <div className="bg-bubble px-6 py-5 rounded-xl shadow text-left space-y-2 max-w-xl">
              <div className="text-main text-lg font-bold">How to update your ChatGPT's personality:</div>
              <ol className="text-sub text-md list-decimal list-inside space-y-1 pt-1">
                <li>Click your profile picture in the top-right corner.</li>
                <li>Click <span className="text-main font-medium">"Customize ChatGPT"</span>.</li>
                <li>Copy & paste the following answers into the matching boxes.</li>
              </ol>
            </div>
          </div>

          {/* Editable columns */}
          <div className="bg-bubble rounded-xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left w-full max-w-4xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-hide">
              <label className="text-base font-semibold text-main">
                What traits should ChatGPT have?
              </label>
              <textarea
                value={traits}
                onChange={() => {}}
                readOnly
                rows={5}
                className="w-full bg-black/25 rounded-lg px-3 py-2 text-white/90 text-opacity-50 focus:outline-none shadow text-sm resize-none"
              />
              <button
                onClick={() => handleCopy('traits', traits)}
                className="text-sm flex items-center gap-1 text-sub hover:text-button transition"
              >
                {copied.traits ? <ClipboardCheck size={16} /> : <ClipboardCopy size={16} />} Copy
              </button>
            </div>

            {/* Column 2 */}
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-hide">
              <label className="text-base font-semibold text-main">
                Anything else ChatGPT should know about you?
              </label>
              <textarea
                value={about}
                onChange={() => {}}
                readOnly
                rows={5}
                className="w-full bg-black/25 rounded-lg px-3 py-2 text-white/90 placeholder-sub placeholder-opacity-40 focus:outline-none shadow text-sm resize-none"
              />
              <button
                onClick={() => handleCopy('about', about)}
                className="text-sm flex items-center gap-1 text-sub hover:text-button transition"
              >
                {copied.about ? <ClipboardCheck size={16} /> : <ClipboardCopy size={16} />} Copy
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-sub text-sm mt-1">
            To edit these instructions, simply click to edit or go back to any step before.
          </p>
        </div>
      </div>

      <ChatInputBar
        value="I updated my preferences in ChatGPT, now can I have some pointers for having better conversations?"
        editable={false}
        onSubmit={handleSubmit}
      />
    </>
  );
}
