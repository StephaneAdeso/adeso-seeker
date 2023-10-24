import React, { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { VscChevronDown } from 'react-icons/vsc';
import './Select.css';

export interface SkrSelectOption {
  icon?: IconType;
  iconPosition?: 'before' | 'after';
  id: string;
  label: string;
  onClick?: () => void;
  value: any;
}

interface SkrSelectProps {
  label: string;
  ariaLabel?: string;
  skrLabel?: React.ReactNode | undefined;
  skrLabelPosition?: 'before' | 'after';
  className?: string;
  hideLabel?: boolean;
  icon?: IconType | undefined;
  iconPosition?: 'before' | 'after';
  onSelect?: (value: any) => void;
  options: SkrSelectOption[];
  selectedId?: string | undefined;
}

export const SkrSelect = ({
  label = '',
  className = '',
  skrLabel,
  skrLabelPosition = 'before',
  hideLabel = false,
  icon = VscChevronDown,
  iconPosition = 'after',
  ariaLabel = label || '',
  onSelect,
  options,
  selectedId = undefined
}: SkrSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(selectedId);
  const [selectedLabel, setSelectedLabel] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: SkrSelectOption) => {
    setSelectedLabel(option.label);
    if (onSelect) {
      onSelect(option.value);
    }
    setSelectedOptionId(option.id);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedOptionId) {
      const selectedOption = options.find(
        (option) => option.id === selectedOptionId
      );
      if (selectedOption) {
        setSelectedLabel(selectedOption.label);
      }
    }
  }, [selectedOptionId, options]);

  return (
    <div title={label} className={`skr-select__container ${className}`}>
      {skrLabelPosition === 'before' && skrLabel && (
        <span
          className="skr-select__skr-label skr-select__skr-label--before"
          aria-label={ariaLabel + 'label'}
        >
          {skrLabel}
        </span>
      )}

      <div
        className={`skr-select ${isOpen ? 'skr-select--open' : ''} ${
          skrLabel && skrLabelPosition === 'before'
            ? 'skr-select--skr-label-before'
            : ''
        } ${
          skrLabel && skrLabelPosition === 'after'
            ? 'skr-select--skr-label-after'
            : ''
        }`}
        aria-label={ariaLabel}
        onClick={toggleDropdown}
        tabIndex={0}
        ref={dropdownRef}
      >
        <div className={`skr-select__label`}>
          {icon && iconPosition === 'before' && (
            <span
              aria-label={ariaLabel + ' icon'}
              className={`skr-select__label-icon skr-select__icon--before ${
                isOpen ? 'skr-select__label-icon--open' : ''
              }`}
            >
              {React.createElement(icon)}
            </span>
          )}

          {!hideLabel && selectedOptionId === undefined && label}
          {!hideLabel && selectedLabel}

          {icon && iconPosition === 'after' && (
            <span
              aria-label={ariaLabel + ' icon'}
              className={`skr-select__label-icon skr-select__icon--after ${
                isOpen ? 'skr-select__label-icon--open' : ''
              }`}
            >
              {React.createElement(icon)}
            </span>
          )}
        </div>

        <div
          className={`skr-select__options-container ${
            isOpen ? 'skr-select__options-container--open' : ''
          }`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              aria-label={option.label}
              title={option.label}
              className={`skr-select__option-item ${
                selectedOptionId === option.id
                  ? 'skr-select__option-item--selected'
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
              tabIndex={0}
            >
              {option.icon && option.iconPosition === 'before' && (
                <span className="skr-select__icon--before">
                  {React.createElement(option.icon)}
                </span>
              )}

              {option.label}

              {option.icon && option.iconPosition === 'after' && (
                <span className="skr-select__icon--after">
                  {React.createElement(option.icon)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {skrLabelPosition === 'after' && skrLabel && (
        <span
          className="skr-select__skr-label skr-select__skr-label--after"
          aria-label={ariaLabel + 'label'}
        >
          skrLabel
        </span>
      )}
    </div>
  );
};
