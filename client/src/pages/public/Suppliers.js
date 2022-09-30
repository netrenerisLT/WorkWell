import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/MainContext.js";
import axios from "axios";

const Suppliers = () => {
  const { setAlert, userInfo } = useContext(MainContext);
  const [suppliers, setSuppliers] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    let url = "/api/suppliers/";

    if (sort === "1" || sort === "2") url += "?sort=" + sort;

    axios
      .get(url)
      .then((resp) => setSuppliers(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [sort, setAlert]);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Suppliers</h1>
        <div className="form-group">
          <label className="mb-1">Sort by:</label>
          <select
            name="supplierId"
            className="form-control"
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Newest</option>
            <option value="1">Name A-Z</option>
            <option value="2">Name Z-A</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center mt-5">
        {suppliers &&
          suppliers.map((supplier) => (
            <div className="col" key={supplier.id}>
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{supplier.name}</h4>
                </div>
                <div className="card-body">
                  <h4 className="card-title pricing-card-title">
                    {supplier.address}
                  </h4>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>{supplier.address}</li>
                    <li>{supplier.email}</li>
                    <li>{supplier.phone_number}</li>
                  </ul>
                </div>
                <div>
                  <Link
                    type="button"
                    to={
                      userInfo.role === 0 || userInfo.role === 1
                        ? "/new-order/" + supplier.id
                        : "/sign-in"
                    }
                    className="w-100 btn btn-lg btn-warning"
                  >
                    {userInfo.id
                      ? "Order Services"
                      : "Sign in to order services"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Suppliers;
