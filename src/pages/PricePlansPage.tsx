import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchPricePlans } from "../redux/pricePlanSlice";
import PricePlanList from "../components/price-plan/PricePlanList";

const PricePlansPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPricePlans());
  }, [dispatch]);

  return (
    <div>
      <PricePlanList />
    </div>
  );
};

export default PricePlansPage;
