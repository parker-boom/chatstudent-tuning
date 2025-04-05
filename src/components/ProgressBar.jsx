'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  User,
  GraduationCap,
  School,
  BookOpen,
  Brain,
  Sparkles,
  ClipboardCheck,
  Plus
} from 'lucide-react';

const steps = [
  '/onboarding/step1',
  '/onboarding/step2',
  '/onboarding/step3',
  '/onboarding/step4',
  '/onboarding/step5',
  '/onboarding/step6',
  '/onboarding/step7',
  '/onboarding/step8',
];

const icons = [
  User,
  GraduationCap,
  School,
  BookOpen,
  Brain,
  Sparkles,
  ClipboardCheck,
  Plus,
];

export default function ProgressBar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = steps.findIndex((step) => pathname.startsWith(step));

  return (
    <div className="w-full max-w-xl mx-auto pb-2">
      <div className="flex justify-between items-start relative">
        {steps.map((path, i) => {
          const Icon = icons[i];
          const isActive = i === currentIndex;

          return (
            <button
              key={i}
              onClick={() => router.push(path)}
              className="relative flex-1 mx-1 group focus:outline-none"
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 w-full ${
                  i <= currentIndex ? 'bg-button' : 'bg-icon'
                } group-hover:opacity-80`}
              />
              {isActive && (
                <div className="absolute top-[110%] left-1/2 transform -translate-x-1/2 mt-1">
                  <Icon size={18} className="text-button" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
