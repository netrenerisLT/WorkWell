import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext.js";

const EditSuppliers = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone_number: "",
    email: "",
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("/api/suppliers/edit/" + id, form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        navigate("/admin/suppliers");
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });

        if (error.response.status === 401)
          setTimeout(() => navigate("/sign-in"), 2000);
      });
  };

  useEffect(() => {
    axios
      .get("/api/suppliers/single/" + id)
      .then((resp) => setForm(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [id, setAlert]);

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
          <label className="mb-1">Adress:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleForm}
            value={form.address}
          ></input>
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Phone number:</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            onChange={handleForm}
            value={form.phone_number}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Email address:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={handleForm}
            value={form.email}
          />
        </div>
        <button className="btn btn-primary">Save changes</button>
      </form>
    </>
  );
};

export default EditSuppliers;
