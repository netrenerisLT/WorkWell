import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainContext from "../../../context/MainContext.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete("/api/orders/delete/" + id)
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

        if (error.response.statcus === 401)
          setTimeout(() => navigate("/sign-in"), 2000);
      });
  };

  useEffect(() => {
    axios
      .get("/api/orders/")
      .then((resp) => setOrders(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [refresh, setAlert]);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>Orders</h1>
      </div>
      {orders.length !== 0 ? (
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Status</th>
              <th>Service</th>
              <th>Order date</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.status ? "Accepted" : "Declined"}</td>
                <td>{order.service?.name}</td>
                <td>{new Date(order.order_date).toLocaleString("lt-LT")}</td>
                <td>
                  {order.user &&
                    order.user.first_name + " " + order.user.last_name}
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={"/admin/orders/edit/" + order.id}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDelete(order.id)}
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
        <h3>Orders doesn't exist yet.</h3>
      )}
    </>
  );
};

export default Orders;
