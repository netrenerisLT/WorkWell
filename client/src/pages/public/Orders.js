import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainContext from "../../context/MainContext.js";

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

        if (error.response.status === 401)
          setTimeout(() => navigate("/sign-in"), 2000);
      });
  };

  const handleRatings = (e, workerId, orderId) => {
    axios
      .post("/api/ratings/worker/" + workerId + "/order/" + orderId, {
        rating: e.target.value,
      })
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
          setTimeout(() => navigate("/sign-in"), 2000);
      });
  };

  useEffect(() => {
    axios
      .get("/api/orders/user/")
      .then((resp) => setOrders(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        if (error.response.status === "401") navigate("/sign-in");
      });
  }, [refresh, setAlert]);

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg mt-4">
        <h1>My orders</h1>
      </div>
      {orders.length !== 0 ? (
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Status</th>
              <th>Service</th>
              <th>Order date</th>
              <th>Worker</th>
              <th>Supplier</th>
              <th>Service rating</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.status ? "Accepted" : "Declined"}</td>
                <td>{order.service?.name}</td>
                <td>{new Date(order.order_date).toLocaleString("lt-LT")}</td>
                <td>
                  {order.worker?.first_name + " " + order.worker?.last_name}
                </td>
                <td>{order.service.supplier?.name}</td>
                <td>
                  {order.rating ? (
                    "Your rating: " + order.rating.rating
                  ) : (
                    <select
                      className="form-control"
                      onChange={(e) =>
                        handleRatings(e, order.workerId, order.id)
                      }
                    >
                      <option value="">Add a review</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
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
