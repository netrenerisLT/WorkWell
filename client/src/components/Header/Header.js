import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <h4>WorkWell</h4>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
            <li>
              <div className="nav-link px-2 text-secondary">Admin</div>
              <ul>
                <li>
                  <Link
                    to="/admin/suppliers"
                    className="nav-link px-2 text-white"
                  >
                    Suppliers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/services"
                    className="nav-link px-2 text-white"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/workers"
                    className="nav-link px-2 text-white"
                  >
                    Workers
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className="nav-link px-2 text-white">
                    Orders
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/suppliers" className="nav-link px-2 text-white">
                Suppliers
              </Link>
            </li>
            <li>
              <Link to="/workers" className="nav-link px-2 text-white">
                Workers
              </Link>
            </li>
            <li>
              <Link to="/orders" className="nav-link px-2 text-white">
                Orders
              </Link>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <Link to="/login">
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
            </Link>
            <Link to="/sign-up">
              <button type="button" className="btn btn-warning me-2">
                Sign-up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
