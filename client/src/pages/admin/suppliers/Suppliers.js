import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/suppliers/")
      .then((resp) => setSuppliers(resp.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg">
        <h1>Suppliers</h1>
        <Link to="suppliers/new">
          <button type="button" className="btn btn-warning me-2">
            Add new supplier
          </button>
        </Link>
      </div>
      {suppliers ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.address}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone_number}</td>
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
