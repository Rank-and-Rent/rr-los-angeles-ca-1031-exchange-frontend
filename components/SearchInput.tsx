"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchInputProps {
  placeholder?: string;
  items: Array<{
    title: string;
    slug: string;
    description?: string;
    href?: string;
  }>;
  onNoResults?: (query: string) => void;
  maxResults?: number;
  className?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  items,
  onNoResults,
  maxResults = 6,
  className = ""
}: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter items based on query
  const filteredItems = useMemo(() => query.trim()
    ? items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, maxResults)
    : [], [query, items, maxResults]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && filteredItems[selectedIndex]) {
            const item = filteredItems[selectedIndex];
            const href = item.href || `/${item.slug}`;
            window.location.href = href;
          } else if (filteredItems.length === 0 && query.trim() && onNoResults) {
            onNoResults(query.trim());
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, query, onNoResults]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleItemClick = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleNoResults = () => {
    if (query.trim() && onNoResults) {
      onNoResults(query.trim());
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-results"
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            id="search-results"
            className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
            role="listbox"
          >
            {filteredItems.length > 0 ? (
              <div className="py-2">
                {filteredItems.map((item, index) => {
                  const href = item.href || `/${item.slug}`;
                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      onClick={handleItemClick}
                      className={`block px-4 py-3 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        index === selectedIndex ? "bg-slate-800/50" : ""
                      }`}
                      role="option"
                      aria-selected={index === selectedIndex}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-slate-100">
                            {item.title}
                          </h4>
                          {item.description && (
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : query.trim() ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-slate-400 mb-3">
                  No results found for &quot;{query}&quot;
                </p>
                <button
                  onClick={handleNoResults}
                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Get help with this →
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
