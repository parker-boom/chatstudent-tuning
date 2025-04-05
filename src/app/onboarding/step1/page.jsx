'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useIsHydrated } from '@/hooks/useIsHydrated';
import ChatInputBar from '@/components/ChatInputBar';

export default function Step1() {
  const [name, setName] = usePersistentState('onboarding_name', '');
  const [traits, setTraits] = usePersistentState('onboarding_traits', '');
  const isHydrated = useIsHydrated();
  const router = useRouter();

  const isValid = isHydrated && name.trim() && traits.trim();

  const chatText =
    name.trim() && traits.trim()
      ? `Hi! My name is ${name.trim()} and I'm ${traits.trim()}.`
      : name.trim()
      ? `Hi! My name is ${name.trim()}.`
      : '';

  const handleSubmit = () => {
    if (!isValid) return;
    router.push('/onboarding/step2');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isValid) {
        handleSubmit();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isValid]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl space-y-10 text-center"
    >
      <div className="flex items-center justify-center w-full px-4 pb-24">
        <div className="w-full max-w-xl space-y-8 text-left">
          <div className="flex flex-col items-center">
            {/* Image Bubble */}
            <div className="pb-2">
              <img src="/images/onboarding/step1.png" alt="Step 1" className="w-full h-[150px] object-contain" loading="eager" />
            </div>
            {/* Text Bubble */}
            <div className="bg-bubble px-6 py-4 rounded-xl shadow text-xl font-bold text-main text-center">
              First, who are you?
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-sub text-sm font-semibold">What is your first name?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full bg-bubble rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
            />
          </div>

          {/* Traits Input */}
          <div className="space-y-1">
            <label className="text-sub text-sm font-semibold">Describe yourself in 3 words.</label>
            <input
              type="text"
              value={traits}
              onChange={(e) => setTraits(e.target.value)}
              placeholder="curious, chill, & driven"
              className="w-full bg-bubble rounded-lg px-4 py-3 text-main placeholder-sub placeholder-opacity-40 focus:outline-none shadow"
            />
          </div>
        </div>
      </div>

      <ChatInputBar
        value={chatText}
        editable={false}
        onSubmit={handleSubmit}
        disabled={!isValid}
      />
    </motion.div>
  );
}
