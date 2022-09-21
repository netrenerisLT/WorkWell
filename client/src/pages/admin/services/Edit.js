import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext.js";

const EditServices = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    supplierId: "",
  });

  const [suppliers, setSuppliers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("/api/services/edit/" + id, form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        navigate("/services");
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
      .get("/api/services/single/" + id)
      .then((resp) => setForm(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [id, setAlert]);

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
      <h1>Edit service</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
            value={form.name}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Duration:</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            onChange={handleForm}
            value={form.duration}
          ></input>
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Price:</label>
          <input
            type="number"
            step="any"
            name="price"
            className="form-control"
            onChange={handleForm}
            value={form.price}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Supplier:</label>
          <select
            name="supplierId"
            onChange={handleForm}
            className="form-control"
            value={form.supplierId ? form.supplierId : ""}
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
        <button className="btn btn-primary">Add service</button>
      </form>
    </>
  );
};

export default EditServices;
