import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/productSlice";
import ProductList from "../components/product/ProductList";

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
