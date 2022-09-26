import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainContext from "../../../context/MainContext.js";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete("/api/workers/delete/" + id)
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
      .get("/api/workers/")
      .then((resp) => setWorkers(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [refresh, setAlert]);

  console.log(workers);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Workers</h1>
        <Link to="/admin/workers/new">
          <button type="button" className="btn btn-warning me-2">
            Add new worker
          </button>
        </Link>
      </div>
      {workers.length !== 0 ? (
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>
                  {worker.photo ? (
                    <img
                      src={worker.photo}
                      alt={worker.first_name + " " + worker.last_name}
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    <img
                      src="https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                      alt="Default profile"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </td>
                <td>{worker.first_name}</td>
                <td>{worker.last_name}</td>
                <td>{worker.supplier?.name}</td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={"/admin/workers/edit/" + worker.id}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDelete(worker.id)}
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
        <h3>Workers doesn't exist yet.</h3>
      )}
    </>
  );
};

export default Workers;
