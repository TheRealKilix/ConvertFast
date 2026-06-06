import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import type { ConverterCategory } from '../types';

interface SearchBarProps {
  converters: ConverterCategory[];
  onSelectConverter: (converter: ConverterCategory) => void;
}

export function SearchBar({ converters, onSelectConverter }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<ConverterCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = query.toLowerCase().trim();
    const results = converters.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerms) ||
        c.keywords.some((k) => k.includes(searchTerms)) ||
        c.units.some(
          (u) =>
            u.name.toLowerCase().includes(searchTerms) ||
            u.symbol.toLowerCase().includes(searchTerms)
        )
    );
    setFiltered(results);
    setIsOpen(results.length > 0);
  }, [query, converters]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (converter: ConverterCategory) => {
    onSelectConverter(converter);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => filtered.length > 0 && setIsOpen(true)}
          placeholder="Rechercher un convertisseur..."
          className="w-full pl-12 pr-10 py-4 bg-surface-800/80 border border-surface-600/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-lg"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-800 border border-surface-600/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-scale-in">
          <div className="max-h-80 overflow-y-auto">
            {filtered.map((converter) => (
              <button
                key={converter.id}
                onClick={() => handleSelect(converter)}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-surface-700/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <converter.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{converter.name}</p>
                  <p className="text-sm text-slate-400 truncate">{converter.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
