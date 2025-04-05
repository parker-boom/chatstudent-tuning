'use client';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';

export default function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-main px-4 py-6">
      <ProgressBar />
      <BackButton />
      <div className="flex-grow flex flex-col items-center justify-center relative">
        {children}
      </div>
    </div>
  );
}
