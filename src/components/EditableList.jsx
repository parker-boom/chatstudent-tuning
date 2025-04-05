'use client';
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { v4 as uuid } from 'uuid';

export default function EditableList({ storageKey, placeholderOptions = [], maxItems = 3, onChange }) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : [];

    // Always ensure there's at least one row
    if (parsed.length === 0) {
      const first = {
        id: uuid(),
        text: '',
        confirmed: false,
        placeholder: getRandomPlaceholder(),
      };
      setItems([first]);
      localStorage.setItem(storageKey, JSON.stringify([first]));
      if (onChange) onChange(); 
    } else {
      setItems(parsed);
    }
  }, [storageKey]);

  const getRandomPlaceholder = () =>
    placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];

  const saveItems = (next) => {
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    if (onChange) onChange(); 
  };

  const handleTextChange = (id, value) => {
    const next = items.map((item) =>
      item.id === id ? { ...item, text: value } : item
    );
    saveItems(next);
  };

  const handleConfirm = (id) => {
    const next = items.map((item) =>
      item.id === id ? { ...item, confirmed: true } : item
    );
    // Add new row if under max
    if (next.length < maxItems) {
      next.push({
        id: uuid(),
        text: '',
        confirmed: false,
        placeholder: getRandomPlaceholder(),
      });
    }
    saveItems(next);
  };

  const handleDelete = (id) => {
    const next = items.filter((item) => item.id !== id);
    saveItems(next);
  };

  return (
    <div className="bg-bubble rounded-xl shadow px-4 py-3 max-h-[160px] overflow-y-auto space-y-2 scrollbar-hide text-left">
      {items.map((item) => {
        const isEmpty = item.text.trim() === '';
        const isConfirmed = item.confirmed;

        return (
          <div key={item.id} className="flex items-center gap-2">
            {isConfirmed ? (
              <>
                <div className="flex-grow text-main text-sm font-semibold truncate max-w-[85%]">
                    {item.text}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-main hover:text-button transition"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleTextChange(item.id, e.target.value)}
                  placeholder={item.placeholder}
                  className="flex-grow bg-background rounded-lg px-3 py-2 text-main placeholder-sub placeholder-opacity-40 text-sm focus:outline-none"
                />
                {!isEmpty && (
                  <button
                    onClick={() => handleConfirm(item.id)}
                    className="p-1 text-main hover:text-button transition"
                  >
                    <Check size={18} />
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
