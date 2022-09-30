import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ====================== admin components ====================== */
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

/* ====================== public components ====================== */
import PublicSuppliers from "./pages/public/Suppliers.js";
import PublicWorkers from "./pages/public/Workers.js";
import NewOrder from "./pages/public/NewOrder.js";
import PublicOrders from "./pages/public/Orders.js";
import Page404 from "./pages/public/404.js";

/* ====================== Authentication components ====================== */
import Login from "./pages/public/Login.js";
import Register from "./pages/public/Register.js";

/* ====================== Basic components ====================== */
import Header from "./components/Header/Header.js";
import Alert from "./components/Alert/Alert.js";

/* ====================== Context components ====================== */
import MainContext from "./context/MainContext.js";

const App = () => {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });

  const [userInfo, setUserInfo] = useState({});
  const contextValues = {
    alert,
    setAlert,
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    axios.get("/api/users/check-auth").then((resp) => {
      setUserInfo(resp.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {userInfo.role === 1 && (
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
            )}

            <Route path="suppliers" element={<PublicSuppliers />}></Route>
            <Route path="workers" element={<PublicWorkers />}></Route>
            {userInfo.id && (
              <>
                <Route path="orders" element={<PublicOrders />}></Route>
                <Route
                  path="new-order/:supplierId"
                  element={<NewOrder />}
                ></Route>
              </>
            )}
            <Route path="sign-in" element={<Login />}></Route>
            <Route path="sign-up" element={<Register />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
