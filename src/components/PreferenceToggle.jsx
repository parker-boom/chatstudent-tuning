'use client';
import { useEffect, useState } from 'react';

export default function PreferenceToggle({ label, sublabel, storageKey }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) setValue(JSON.parse(stored));
  }, [storageKey]);

  const toggle = () => {
    const next = value === true ? false : true;
    setValue(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div className="flex justify-between items-center bg-background p-3 rounded-lg shadow">
      <div>
        <div className="text-main font-medium">{label}</div>
        {sublabel && <div className="text-sub text-sm">{sublabel}</div>}
      </div>
      <button
        onClick={toggle}
        className={`w-12 h-6 rounded-full transition ${
          value ? 'bg-button' : 'bg-icon'
        }`}
      >
        <div
          className={`w-4 h-4 bg-background rounded-full shadow transform transition ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
