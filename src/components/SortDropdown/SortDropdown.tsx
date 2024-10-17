import React, { useState, useRef, useEffect } from "react";

interface SortDropdownProps {
  data: any[];
  setSortedData: React.Dispatch<React.SetStateAction<any[]>> | any;
  sortableFields: Record<string, string>;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  data,
  setSortedData,
  sortableFields
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter by");
  const customSelectRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string, displayText: string) => {
    const [field, order] = value.split(" ");

    const getNestedValue = (obj: any, field: string) => {
      return field
        .split(".")
        .reduce((acc, key) => (acc ? acc[key] : null), obj);
    };

    const sortedData = [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (field === "id") {
        aValue = a.id;
        bValue = b.id;
      } else {
        aValue = getNestedValue(a, field);
        bValue = getNestedValue(b, field);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aValueString =
        typeof aValue === "string" ? aValue.toLowerCase() : aValue;
      const bValueString =
        typeof bValue === "string" ? bValue.toLowerCase() : bValue;

      if (order === "asc") {
        return aValueString > bValueString
          ? 1
          : aValueString < bValueString
          ? -1
          : 0;
      } else {
        return aValueString < bValueString
          ? 1
          : aValueString > bValueString
          ? -1
          : 0;
      }
    });

    setSortedData(sortedData);
    setSelectedOption(displayText);
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
        <span className='custom-select-trigger'>{selectedOption}</span>
        <div className={`custom-options ${isOpen ? "opened" : ""}`}>
          <span
            className='custom-option'
            onClick={() => handleOptionClick("id asc", "ID Asc")}
          >
            ID Asc
          </span>
          <span
            className='custom-option'
            onClick={() => handleOptionClick("id desc", "ID Desc")}
          >
            ID Desc
          </span>
          {data &&
            data.length > 0 &&
            Object.entries(sortableFields).map(([key, value]) =>
              typeof data[0][key] !== undefined ? (
                typeof data[0][key] === "string" ? (
                  <>
                    <span
                      className='custom-option'
                      onClick={() =>
                        handleOptionClick(`${key} asc`, `${value} A-Z`)
                      }
                    >
                      {`${value} A-Z`}
                    </span>
                    <span
                      className='custom-option'
                      onClick={() =>
                        handleOptionClick(`${key} desc`, `${value} Z-A`)
                      }
                    >
                      {`${value} Z-A`}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className='custom-option'
                      onClick={() =>
                        handleOptionClick(`${key} asc`, `${value} Asc`)
                      }
                    >
                      {`${value} Asc`}
                    </span>
                    <span
                      className='custom-option'
                      onClick={() =>
                        handleOptionClick(`${key} desc`, `${value} Desc`)
                      }
                    >
                      {`${value} Desc`}
                    </span>
                  </>
                )
              ) : null
            )}
        </div>
      </div>
    </div>
  );
};
