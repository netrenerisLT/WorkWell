import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Suppliers from "./pages/admin/suppliers/Suppliers.js";
import AddSuppliers from "./pages/admin/suppliers/New.js";
import MainContext from "./context/MainContext.js";
import Header from "./components/Header/Header.js";
import "./App.css";

const App = () => {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });

  const contextValues = {
    alert,
    setAlert,
  };

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="admin">
              <Route index element={<Suppliers />} />
              <Route path="suppliers/new" element={<AddSuppliers />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
