'use client';
import { useRouter } from 'next/navigation';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-bubble rounded-xl p-10 shadow-md space-y-6">
        <h1 className="text-4xl font-bold text-main text-center">Looking to customize ChatGPT as a student?</h1>
        <p className="text-sub text-lg text-center">
          ChatGPT works better when it knows more about you. This quick process will help you get the most out of your chats. 
        </p>
        <div className="flex justify-center">
          <button
            className="bg-button text-background px-6 py-3 rounded-lg font-medium hover:opacity-80 transition"
            onClick={() => router.push('/onboarding/step1')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
