import React, { useEffect, useRef, useState } from "react";
import "./DropdownStatus.css";

interface DropdownStatusProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const DropdownStatus: React.FC<DropdownStatusProps> = ({
  selectedStatus,
  setSelectedStatus
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const customSelectRef = useRef<HTMLDivElement | null>(null);

  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSelectedStatus(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      customSelectRef.current &&
      !customSelectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='custom-select-wrapper' ref={customSelectRef}>
      <div
        className={`custom-select ${isOpen ? "opened" : ""}`}
        onClick={toggleDropdown}
      >
        <span className='custom-select-trigger'>{selectedStatus || "All"}</span>
        <div className={`custom-options ${isOpen ? "opened" : ""}`}>
          <span className='custom-option' onClick={() => handleOptionClick("")}>
            All
          </span>
          {options.map((option) => (
            <span
              key={option.value}
              className='custom-option'
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownStatus;
