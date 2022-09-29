import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainContext from "../../../context/MainContext.js";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete("/api/suppliers/delete/" + id)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });

        if (error.response.status === 401)
          setTimeout(() => navigate("/login"), 2000);
      });
  };

  useEffect(() => {
    axios
      .get("/api/suppliers/")
      .then((resp) => setSuppliers(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [refresh, setAlert]);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Suppliers</h1>
        <Link to="/admin/suppliers/new">
          <button type="button" className="btn btn-warning me-2">
            Add new supplier
          </button>
        </Link>
      </div>
      {suppliers.length !== 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.address}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone_number}</td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={"/admin/suppliers/edit/" + supplier.id}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDelete(supplier.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Suppliers doesn't exist yet.</h3>
      )}
    </>
  );
};

export default Suppliers;
