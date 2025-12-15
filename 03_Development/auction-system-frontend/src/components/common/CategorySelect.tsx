// src/components/common/CategorySelect.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "@/styles/category-select.css";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  categories?: string[];
}

const DEFAULT_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Jewelry",
  "Art",
  "Collectibles",
  "Other",
];

export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  disabled = false,
  error = false,
  placeholder = "Select a category",
  categories = DEFAULT_CATEGORIES,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = categories.find(
    (cat) => cat.toLowerCase() === value.toLowerCase()
  ) || null;

  return (
    <div
      className={`category-select ${disabled ? "category-select-disabled" : ""} ${error ? "category-select-error" : ""}`}
      ref={containerRef}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="category-select-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="category-select-value">
          {selectedCategory || <span className="category-select-placeholder">{placeholder}</span>}
        </span>
        <ChevronDown
          size={18}
          className={`category-select-icon ${isOpen ? "category-select-icon-open" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="category-select-dropdown">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                onChange(category);
                setIsOpen(false);
              }}
              className={`category-select-item ${
                value.toLowerCase() === category.toLowerCase()
                  ? "category-select-item-selected"
                  : ""
              }`}
              role="option"
              aria-selected={
                value.toLowerCase() === category.toLowerCase()
              }
            >
              <span className="category-select-item-text">{category}</span>
              {value.toLowerCase() === category.toLowerCase() && (
                <Check size={18} className="category-select-item-check" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
