import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* ====================== admin components ====================== */
import Header from "./components/Header/Header.js";
import MainContext from "./context/MainContext.js";
import Orders from "./pages/admin/Orders/Orders.js";
import EditOrders from "./pages/admin/Orders/Edit.js";
import Suppliers from "./pages/admin/Suppliers/Suppliers.js";
import AddSuppliers from "./pages/admin/Suppliers/New.js";
import EditSuppliers from "./pages/admin/Suppliers/Edit.js";
import Services from "./pages/admin/Services/Services.js";
import AddServices from "./pages/admin/Services/New.js";
import EditServices from "./pages/admin/Services/Edit.js";
import Workers from "./pages/admin/Workers/Workers.js";
import AddWorkers from "./pages/admin/Workers/New.js";
import EditWorkers from "./pages/admin/Workers/Edit.js";
import Alert from "./components/Alert/Alert.js";

/* ====================== users components ====================== */
import PublicSuppliers from "./pages/users/Suppliers.js";

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
            <Route path="admin">
              <Route path="orders">
                <Route index element={<Orders />} />
                <Route path="edit/:id" element={<EditOrders />} />
              </Route>
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
            </Route>
            <Route path="suppliers" element={<PublicSuppliers />}></Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
