import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { SortDropdown } from "../SortDropdown/SortDropdown";
import Search from "../search/Search";
import DynamicTable from "../dynamic-table/DynamicTable";
import { fetchCountries, editCountry } from "../../redux/countriesSlice";
import Loading from "../loading/Loading";

const Countries: React.FC = () => {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    let updatedData = countries;

    if (searchTerm) {
      updatedData = updatedData.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredData(updatedData);
  }, [countries, searchTerm]);

  if (error) return <p>Error: {error}</p>;

  const handleUpdateRow = async (updatedRow: any) => {
    try {
      const resultAction = await dispatch(editCountry(updatedRow));
      if (editCountry.fulfilled.match(resultAction)) {
        setFilteredData((prev) =>
          prev.map((row) =>
            row.id === updatedRow.id ? resultAction.payload : row
          )
        );
      }
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const handleSort = (sortedData: any[]) => {
    setFilteredData(sortedData);
  };

  return (
    <div className='content'>
      <div className='content-header'>
        <div className='table-name'>
          <h2>Countries List</h2>
        </div>
        <div className='content-header-filters'>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortDropdown
            data={filteredData}
            setSortedData={handleSort}
            sortableFields={{
              countryName: "Country",
              text: "text",
              population: "population"
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className='loading'>
          <Loading />
        </div>
      ) : (
        <DynamicTable data={filteredData} onUpdateRow={handleUpdateRow} />
      )}
    </div>
  );
};

export default Countries;
