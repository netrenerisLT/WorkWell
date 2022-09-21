import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext.js";

const AddWorkers = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    photo: "",
  });
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [suppliers, setSuppliers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/workers/new", form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        navigate("/workers");
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
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [setAlert]);

  return (
    <>
      <h1>Add new worker</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">First Name:</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Last Name:</label>
          <input
            type="text"
            name="last_namee"
            className="form-control"
            onChange={handleForm}
          ></input>
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Profile image:</label>
          <input
            type="file"
            name="photo"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Supplier:</label>
          <select
            name="supplierId"
            onChange={handleForm}
            className="form-control"
            required
          >
            <option>Choose supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary">Add supplier</button>
      </form>
    </>
  );
};

export default AddWorkers;
