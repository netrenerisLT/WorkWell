import { useState, useContext, useEffect } from "react";
import MainContext from "../../context/MainContext.js";
import axios from "axios";

const Suppliers = () => {
  const { setAlert } = useContext(MainContext);
  const [suppliers, setSuppliers] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    let url = "/api/suppliers/";

    if (sort === "1" || sort === "2" || sort === "3") url += "?sort=" + sort;

    axios
      .get(url)
      .then((resp) => setSuppliers(resp.data))
      .catch((error) => {
        console.log(error);
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
            <option value="3">Best Rated</option>
          </select>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center mt-5">
        {suppliers &&
          suppliers.map((supplier) => (
            <div class="col" key={supplier.id}>
              <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                  <h4 class="my-0 fw-normal">{supplier.name}</h4>
                </div>
                <div class="card-body">
                  <h4 class="card-title pricing-card-title">
                    {supplier.address}
                  </h4>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>{supplier.address}</li>
                    <li>{supplier.email}</li>
                    <li>{supplier.phone_number}</li>
                  </ul>
                  <button type="button" class="w-100 btn btn-lg btn-warning">
                    Order Services
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Suppliers;
