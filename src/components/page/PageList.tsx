import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchPages, editPage } from "../../redux/pageSlice";
import Search from "../search/Search";
import DropdownStatus from "../status-dropdown/DropdownStatus";
import DynamicTable from "../dynamic-table/DynamicTable";
import { SortDropdown } from "../SortDropdown/SortDropdown";
import Loading from "../loading/Loading";

const PageList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pages, loading, error } = useAppSelector((state) => state.pages);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState(pages);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPages());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let updatedData = pages;

    if (searchTerm) {
      updatedData = updatedData.filter((page) =>
        Object.values(page).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedStatus) {
      updatedData = updatedData.filter((page) =>
        selectedStatus === "active" ? page.active : !page.active
      );
    }

    setFilteredData(updatedData);
  }, [pages, searchTerm, selectedStatus]);

  if (error) return <p>Error: {error}</p>;

  const handleUpdateRow = async (updatedRow: any) => {
    try {
      const response = await dispatch(editPage(updatedRow)).unwrap();
      setFilteredData((prev) =>
        prev.map((row) => (row.id === response.id ? response : row))
      );
    } catch (err) {
      console.error("Failed to update row:", err);
    }
  };

  return (
    <div className='content'>
      <div className='content-header'>
        <div>
          <h2>Page List</h2>
        </div>
        <div className='content-header-filters'>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DropdownStatus
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <SortDropdown
            data={filteredData}
            setSortedData={setFilteredData}
            sortableFields={{ title: "Title" }}
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

export default PageList;
