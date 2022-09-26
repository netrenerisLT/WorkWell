import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../../context/MainContext.js";

const Services = () => {
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete("/api/services/delete/" + id)
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
      .get("/api/services/")
      .then((resp) => setServices(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [refresh, setAlert]);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Services</h1>
        <Link to="new">
          <button type="button" className="btn btn-warning me-2">
            Add new service
          </button>
        </Link>
      </div>
      {services.length !== 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.duration}</td>
                <td>
                  {service.price} <span className="eur">€</span>
                </td>
                <td>{service.supplier?.name}</td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={"/services/edit/" + service.id}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDelete(service.id)}
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
        <h3>Services doesn't exist.</h3>
      )}
    </>
  );
};

export default Services;
