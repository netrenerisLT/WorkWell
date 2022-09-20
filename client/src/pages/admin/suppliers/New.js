import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../../../components/Alert/Alert.js";
import MainContext from "../../../context/MainContext.js";

const AddSuppliers = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
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
      .post("/api/suppliers/new", form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        window.scrollTo(0, 0);

        setTimeout(() => {
          setAlert({ message: "" });
          navigate("/admin");
        }, 2000);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });

        window.scrollTo(0, 0);
        if (error.response.status === 401)
          setTimeout(() => navigate("/login"), 2000);
      });
  };

  return (
    <div className="container">
      <h1>Add new supplier</h1>
      <Alert />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Adress:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleForm}
          ></input>
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Phone number:</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Email address:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <button className="btn btn-primary">Add supplier</button>
      </form>
    </div>
  );
};

export default AddSuppliers;