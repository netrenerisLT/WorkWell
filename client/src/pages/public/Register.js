import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../context/MainContext.js";

const Register = () => {
  const [form, setForm] = useState({});

  const { setAlert } = useContext(MainContext);

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/register/", form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        setTimeout(() => navigate("/sign-in"), 1000);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  };

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Registration</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label className="mb-1">Name:</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Surname:</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </>
  );
};

export default Register;
