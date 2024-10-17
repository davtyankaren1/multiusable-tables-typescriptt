import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchPricePlans, editPricePlan } from "../../redux/pricePlanSlice";
import Search from "../search/Search";
import DropdownStatus from "../status-dropdown/DropdownStatus";
import DynamicTable from "../dynamic-table/DynamicTable";
import { SortDropdown } from "../SortDropdown/SortDropdown";
import Loading from "../loading/Loading";

const PricePlanList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pricePlans, loading, error } = useAppSelector(
    (state) => state.pricePlans
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState(pricePlans);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPricePlans());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let updatedData = pricePlans;

    if (searchTerm) {
      updatedData = updatedData.filter((plan) =>
        Object.values(plan).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedStatus) {
      updatedData = updatedData.filter((plan) =>
        selectedStatus === "active" ? plan.active : !plan.active
      );
    }

    setFilteredData(updatedData);
  }, [pricePlans, searchTerm, selectedStatus]);

  if (error) return <p>Error: {error}</p>;

  const handleUpdateRow = async (updatedRow: any) => {
    try {
      const resultAction = await dispatch(editPricePlan(updatedRow));
      if (editPricePlan.fulfilled.match(resultAction)) {
        setFilteredData((prev) =>
          prev.map((row) =>
            row.id === updatedRow.id ? resultAction.payload : row
          )
        );
      }
    } catch (error) {
      console.error("Error updating price plan:", error);
    }
  };

  return (
    <div className='content'>
      <div className='content-header'>
        <div>
          <h2>Price Plan List</h2>
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
            sortableFields={{
              description: "Description"
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

export default PricePlanList;
