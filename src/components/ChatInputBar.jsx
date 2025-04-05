'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpCircle } from 'lucide-react';

export default function ChatInputBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = '',
  editable = false,
  disabled = false,
}) {
  const [internalValue, setInternalValue] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 96) + 'px'; // grow up to ~2.5 lines
    }
  }, [internalValue]);

  const handleChange = (e) => {
    const next = e.target.value;
    setInternalValue(next);
    if (onChange) onChange(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && onSubmit && internalValue.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleClickSubmit = () => {
    if (onSubmit && internalValue.trim()) onSubmit();
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 px-4 z-20">
      <div className="w-full max-w-xl mx-auto bg-bubble rounded-xl shadow-md flex items-end px-4 py-2 min-h-[56px]">
        {editable ? (
          <textarea
            ref={textareaRef}
            rows={1}
            value={internalValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-grow resize-none bg-transparent text-main placeholder-sub text-lg focus:outline-none leading-[1.6] pt-[6px]"
            style={{
              lineHeight: '1.6',
              paddingBottom: '6px',
              paddingTop: '6px',
              overflow: 'hidden',
              maxHeight: '96px',
            }}
          />
        ) : (
          <p className="text-main text-left text-lg break-words flex-grow leading-snug py-[6px]">
            {internalValue}
          </p>
        )}
        <button
          onClick={handleClickSubmit}
          disabled={disabled || !internalValue.trim()}
          className={`ml-3 transition ${
            disabled || !internalValue.trim()
              ? 'opacity-40 cursor-not-allowed'
              : 'opacity-100 hover:opacity-90'
          }`}
        >
          <ArrowUpCircle size={40} fill="#ffffff" stroke="#303030" />
        </button>
      </div>
    </div>
  );
}
