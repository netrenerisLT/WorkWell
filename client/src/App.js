import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import MainContext from "./context/MainContext.js";
import Suppliers from "./pages/admin/suppliers/Suppliers.js";
import AddSuppliers from "./pages/admin/suppliers/New.js";
import EditSuppliers from "./pages/admin/suppliers/Edit.js";
import Services from "./pages/admin/services/Services.js";
import AddServices from "./pages/admin/services/New.js";
import EditServices from "./pages/admin/services/Edit.js";
import Workers from "./pages/admin/Workers/Workers.js";
import AddWorkers from "./pages/admin/Workers/New.js";
import EditWorkers from "./pages/admin/Workers/Edit.js";
import Alert from "./components/Alert/Alert.js";

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
          <Alert />
          <Routes>
            <Route path="suppliers">
              <Route index element={<Suppliers />} />
              <Route path="new" element={<AddSuppliers />} />
              <Route path="edit/:id" element={<EditSuppliers />} />
            </Route>
            <Route path="services">
              <Route index element={<Services />} />
              <Route path="new" element={<AddServices />} />
              <Route path="edit/:id" element={<EditServices />} />
            </Route>
            <Route path="workers">
              <Route index element={<Workers />} />
              <Route path="new" element={<AddWorkers />} />
              <Route path="edit/:id" element={<EditWorkers />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
