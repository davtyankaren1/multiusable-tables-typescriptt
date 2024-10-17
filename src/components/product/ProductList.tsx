import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchProducts, editProduct } from "../../redux/productSlice";
import { SortDropdown } from "../SortDropdown/SortDropdown";
import Search from "../search/Search";
import DropdownStatus from "../status-dropdown/DropdownStatus";
import DynamicTable from "../dynamic-table/DynamicTable";
import Loading from "../loading/Loading";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let updatedData = products;

    if (searchTerm) {
      updatedData = updatedData.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedStatus) {
      updatedData = updatedData.filter((product) =>
        selectedStatus === "active" ? product.active : !product.active
      );
    }

    setFilteredData(updatedData);
  }, [products, searchTerm, selectedStatus]);

  if (error) return <p>Error: {error}</p>;

  const handleUpdateRow = async (updatedRow: any) => {
    try {
      const result = await dispatch(editProduct(updatedRow));
      if (editProduct.fulfilled.match(result)) {
        setFilteredData((prev) =>
          prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSort = (sortedData: any[]) => {
    setFilteredData(sortedData);
  };

  return (
    <div className='content'>
      <div className='content-header'>
        <div className='table-name'>
          <h2>Product List</h2>
        </div>
        <div className='content-header-filters'>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DropdownStatus
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <SortDropdown
            data={filteredData}
            setSortedData={handleSort}
            sortableFields={{
              name: "Name"
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

export default ProductList;
