import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext.js";

const EditOrders = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    order_date: "",
    status: "",
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "photo" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    axios
      .put("/api/orders/edit/" + id, form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        navigate("/admin/orders");
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
      .get("/api/orders/single/" + id)
      .then((resp) => {
        resp.data.order_date = new Date(resp.data.order_date)
          .toISOString()
          .slice(0, 16);
        resp.data.status = resp.data.status ? "1" : "0";
        setForm(resp.data);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [id, setAlert]);

  return (
    <>
      <h1>Edit order</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Order date</label>
          <input
            type="datetime-local"
            name="order_date"
            className="form-control"
            onChange={handleForm}
            value={form.order_date}
          ></input>
        </div>
        <div className="form-group mb-3">
          <label className="mb-1">Status</label>
          <select
            name="status"
            className="form-control"
            onChange={handleForm}
            value={form.status}
          >
            <option value="0">Decline</option>
            <option value="1">Accept</option>
          </select>
        </div>
        <button className="btn btn-primary">Save changes</button>
      </form>
    </>
  );
};

export default EditOrders;
