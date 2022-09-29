import { useState, useContext, useEffect } from "react";
import MainContext from "../../context/MainContext.js";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

const NewOrder = () => {
  const { supplierId } = useParams();
  const { setAlert } = useContext(MainContext);
  const [services, setServices] = useState([]);
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/orders/new", form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        navigate("/suppliers");
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
      .get("/api/services/?supplier=" + supplierId)
      .then((resp) => setServices(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        if (error.response.status === "401") navigate("/login");
      });
  }, [setAlert]);

  useEffect(() => {
    axios
      .get("/api/workers/?supplier=" + supplierId)
      .then((resp) => setWorkers(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [setAlert]);

  return (
    <>
      <div className="align-items-center mt-4">
        <h1>New Order in </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mt-2 w-50">
            <select
              name="serviceId"
              className="form-control"
              onChange={handleForm}
            >
              <option value="0">Choose an service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name + " | Trukme: " + service.duration}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 w-50">
            <select
              name="workerId"
              className="form-control"
              onChange={handleForm}
            >
              <option value="0">Choose a worker:</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.first_name + " " + worker.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 w-50">
            <input
              name="order_date"
              type="datetime-local"
              onChange={handleForm}
            ></input>
          </div>
          <button className="btn btn-primary mt-2 w-50">Create order</button>
        </form>
      </div>
    </>
  );
};

export default NewOrder;
