'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const steps = [
    '/onboarding/step1',
    '/onboarding/step2',
    '/onboarding/step3',
    '/onboarding/step4',
    '/onboarding/step5',
    '/onboarding/step6',
    '/onboarding/step7',
  ];

  const currentIndex = steps.findIndex((step) => pathname.startsWith(step));
  const canGoBack = currentIndex > 0;

  if (!canGoBack) return null;

  const prevStep = steps[currentIndex - 1];

  return (
    <div
      className="fixed top-0 left-0 h-full z-30 flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => router.push(prevStep)}
        className="flex flex-col items-center justify-center text-button p-3 transition-all focus:outline-none"
      >
        <ChevronLeft size={30} className="text-button" />
        {hovered && (
          <span className="text-xs font-semibold mt-1">Go Back</span>
        )}
      </button>

      {/* Gradient panel on hover */}
      {hovered && (
        <div className="absolute left-0 top-0 h-full w-36 bg-gradient-to-r from-white/10 to-transparent pointer-events-none transition-opacity duration-200" />
      )}
    </div>
  );
}
