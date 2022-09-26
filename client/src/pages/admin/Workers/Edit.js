import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext.js";

const EditWorkers = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    photo: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "photo" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    axios
      .put("/api/workers/edit/" + id, formData)
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
      .get("/api/workers/single/" + id)
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
      <h1>Edit worker</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">First Name:</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleForm}
            value={form.first_name}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Last Name:</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            onChange={handleForm}
            value={form.last_name}
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
        {form.photo && typeof form.photo === "string" && (
          <div className=" mb-3">
            <img src={form.photo} alt="" style={{ maxWidth: 200 }} />
            <div>
              <button
                className="btn btn-danger mt-2"
                onClick={(e) => {
                  setForm({ ...form, photo: "" });
                }}
              >
                Delete Image
              </button>
            </div>
          </div>
        )}
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
        <button className="btn btn-primary">Save changes</button>
      </form>
    </>
  );
};

export default EditWorkers;
