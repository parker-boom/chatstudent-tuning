'use client';
import { useRouter } from 'next/navigation';
import {
  UserCircle,
  Settings,
  HelpCircle,
  MessageSquareText,
  Mic,
} from 'lucide-react';

const tips = [
  {
    icon: UserCircle,
    title: 'Share Context',
    desc: 'The more I understand you and your goals, the better I can help.',
  },
  {
    icon: Settings,
    title: 'Guide the Chat',
    desc: 'Even when learning from me, keep control of the conversation.',
  },
  {
    icon: HelpCircle,
    title: 'Questions Help',
    desc: 'Let me ask to clarify—and ask me questions back anytime.',
  },
  {
    icon: MessageSquareText,
    title: 'One Goal, One Chat',
    desc: 'Use separate chats for separate tasks to keep things clear.',
  },
  {
    icon: Mic,
    title: 'Speak Naturally',
    desc: 'I\'m your super assistant, and I’m at my best when you talk naturally!',
  },
];

export default function Step8() {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full px-6 pt-10 pb-0">
      <div className="w-full max-w-xl space-y-4 text-center">

        {/* Header Bubble */}
        <div className = "pb-8">
        <div className="bg-bubble inline-block px-6 py-5 rounded-xl shadow text-main space-y-3">
          <div className="text-xl font-bold">Want to customize your experience even more?</div>
          <a
            href="https://chatgpt.com/share/67eff19a-42f8-800d-aae3-e11dafb64612"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-background px-4 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition inline-block"
          >
            Let's Chat!
          </a>

        </div>
        </div>

        {/* Subheader */}
        <div className="text-sub text-sm font-semibold -mt-6">
          Here is how to get the most out of our conversations:
        </div>

        {/* Tips */}
        <div className="space-y-4 text-left">
          {tips.map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="bg-icon/20 rounded-xl px-5 py-4 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <Icon size={20} className="text-background" />
              </div>
              <div>
                <div className="text-main font-semibold">{title}</div>
                <div className="text-sub text-sm">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="pt-10">
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-white text-background px-6 py-2 rounded-full font-semibold shadow hover:opacity-90 transition"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
