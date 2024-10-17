import React from "react";
import CustomInput from "../custom-input/CustomInput";
import "./Search.css";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search-wrapper'>
      <CustomInput
        value={searchTerm}
        placeholder='Search...'
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
