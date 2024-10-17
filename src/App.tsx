import { Route, Routes, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import PricePlansPage from "./pages/PricePlansPage";
import Navbar from "./components/navbar/Navbar";
import PagesPage from "./pages/PagesPage";
import CountriesPage from "./pages/CountriesPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/products' />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/price-plan' element={<PricePlansPage />} />
        <Route path='/pages' element={<PagesPage />} />
        <Route path='/countries' element={<CountriesPage />} />
      </Routes>
    </div>
  );
};

export default App;
