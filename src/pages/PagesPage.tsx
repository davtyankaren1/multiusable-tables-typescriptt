import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchPages } from "../redux/pageSlice";
import PageList from "../components/page/PageList";

const PagesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  return (
    <div>
      <PageList />
    </div>
  );
};

export default PagesPage;
