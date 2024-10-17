import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/productSlice";
import Countries from "../components/countries/Countries";

const CountriesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Countries />
    </div>
  );
};

export default CountriesPage;
