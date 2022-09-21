import { useContext, useEffect } from "react";
import MainContext from "../../context/MainContext.js";

const Alert = () => {
  const { alert, setAlert } = useContext(MainContext);

  useEffect(() => {
    if (alert.message === "") return;
    setTimeout(() => {
      setAlert({ message: "" });
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return (
    alert.message && (
      <div className={"alert alert-" + alert.status}>{alert.message}</div>
    )
  );
};

export default Alert;
