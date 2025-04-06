'use client';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';

export default function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-main px-4 pb-6 pt-[64px]">
      {/* Fixed ProgressBar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-background px-4 pt-6">
        <ProgressBar />
      </div>

      {/* Back Button (only on desktop) */}
      <div className="hidden sm:block">
        <BackButton />
      </div>

      {/* Main Page Content */}
      <div className="flex-grow flex flex-col items-center justify-center relative">
        {children}
      </div>
    </div>
  );
}
