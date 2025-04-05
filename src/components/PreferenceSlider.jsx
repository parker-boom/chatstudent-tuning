'use client';
import { useEffect, useState } from 'react';

export default function PreferenceSlider({
  label,
  storageKey,
  leftLabel,
  rightLabel,
  min = 1,
  max = 5,
  defaultValue = 3,
}) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) setValue(parseInt(stored));
  }, [storageKey]);

  const handleChange = (e) => {
    const next = parseInt(e.target.value);
    setValue(next);
    localStorage.setItem(storageKey, next);
  };

  return (
    <div className="space-y-2 bg-background p-3 rounded-lg shadow">
      <div className="text-main font-medium">{label}</div>
      <div className="flex justify-between text-sub text-sm">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
}
