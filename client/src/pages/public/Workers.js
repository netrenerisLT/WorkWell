import { useState, useContext, useEffect } from "react";
import MainContext from "../../context/MainContext.js";
import axios from "axios";

const Workers = () => {
  const { setAlert } = useContext(MainContext);
  const [suppliers, setSuppliers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("0");
  const [selectedSorting, setSelectedSorting] = useState("0");

  const handleFilter = (e) => {
    setSelectedSupplier(e.target.value);
  };
  const handleSorting = (e) => {
    setSelectedSorting(e.target.value);
  };

  useEffect(() => {
    let url = "/api/workers/";
    const searchParams = new URLSearchParams();
    if (selectedSupplier !== "0")
      searchParams.append("supplier", selectedSupplier);
    if (selectedSorting !== "0") searchParams.append("sort", selectedSorting);
    url += "?" + searchParams.toString();
    axios
      .get(url)
      .then((resp) => {
        setWorkers(resp.data);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [selectedSupplier, selectedSorting, setAlert]);

  useEffect(() => {
    axios
      .get("/api/suppliers")
      .then((resp) => setSuppliers(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [setAlert]);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Workers</h1>
        <div className="form-group d-flex gap-3">
          <div className="form-group">
            <label className="mb-1">Select supplier:</label>
            {suppliers && (
              <select className="form-control" onChange={handleFilter}>
                <option value="0">All supplliers</option>
                {suppliers.map((supplier) => (
                  <option value={supplier.id} key={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <label className="mb-1">Sort by:</label>
            <select className="form-control" onChange={handleSorting}>
              <option value="0">Blyn</option>
              <option value="1">Rating: high to low</option>
              <option value="2">Rating: low to high</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center mt-5">
        {workers &&
          workers.map((worker) => (
            <div className="col" key={worker.id}>
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{worker.supplier?.name}</h4>
                </div>
                <div className="card-body">
                  <h4 className="card-title pricing-card-title">
                    {worker.first_name + " " + worker.last_name}
                  </h4>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>
                      {worker.photo ? (
                        <img
                          src={worker.photo}
                          alt={worker.first_name + " " + worker.last_name}
                          style={{ maxWidth: "100px" }}
                        />
                      ) : (
                        <img
                          src="https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                          alt="Default profile"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                    </li>
                    <li>
                      {worker.total_rating &&
                        parseFloat(worker.total_rating).toFixed(2)}
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-warning"
                  >
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

export default Workers;
