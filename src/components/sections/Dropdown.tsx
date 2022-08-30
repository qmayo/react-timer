import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface DropdownProps {
  title: string;
  options: Array<{
    name: string;
    value: string | number;
  }>;
  selectedOption: string; //VALUE of option IN options
  setSelectedOption: (option: any) => any;
}

const Dropdown = ({ title, options, selectedOption, setSelectedOption }: DropdownProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={`dropdown ${isActive ? 'is-active' : ''}`}
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{title}</span>
          <span className="icon is-small">
            <FaAngleDown />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {/* @ts-ignore */}
          {options.map((option) => {
            if (option.value === selectedOption) {
              return (
                <a
                  className="dropdown-item is-active"
                  onClick={() => {
                    setSelectedOption(option.value);
                    setIsActive(false);
                  }}
                  key={nanoid(5)}
                >
                  {option.name}
                </a>
              );
            } else {
              return (
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedOption(option.value);
                    setIsActive(false);
                  }}
                  key={nanoid(5)}
                >
                  {option.name}
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
