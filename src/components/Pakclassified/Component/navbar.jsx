import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PostAdForm from "../Modals/post";
import Signup from "../Modals/signup";
import Login from "../Modals/login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [categories, setCategories] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPost, setShowPost] = useState(false);
  
  const fetchCategories = async () => {

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/AdvertisementCategory`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch categories");
        return;
      }
      setCategories(data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <>
      <div className="bg-light py-2 border-bottom">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <span className="text-dark fw-semibold">
            Welcome {user ? user.Name || "User" : "Guest"}
          </span>

          {user ? (
            <div className="d-flex align-items-center">
              <Button
                className="me-2"
                variant="success"
                onClick={() => setShowPost(true)}>
                Post Advertisement
              </Button>

              <NavDropdown
                title={
                  <>
                    <Image
                      src={user.Image ? `${import.meta.env.VITE_BASE_URL}${user.Image}` : "/default-user.png"} alt={user}
                      roundedCircle
                      width={35}
                      height={35}
                      className="me-2"
                      loading="lazy"

                    />
                  </>
                }
                id="user-dropdown"
                align="end"
              >
                <h6 className="ms-3" > {user.Name || "User"}</h6>
                <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">Logout</NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <div>
              <Button variant="outline-success" className="me-2" onClick={() => setShowLogin(true)}>Login</Button>
              <Button variant="outline-success" onClick={() => setShowSignup(true)}>Signup</Button>
            </div>
          )}
        </Container>
      </div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-success">
            <h3 className="mb-0">PakClasified</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center">
              <NavDropdown title="Categories" id="categories-dropdown">
                {categories.map(cat => (
                  <NavDropdown.Item key={cat._id} as={Link} to={`/category/${cat._id}`}>
                    {cat.Name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Link to="/" className="nav-link">  Home </Link>
              <Link to="/about" className="nav-link">   About  </Link>
              <Link to="/contact" className="nav-link">   Contact </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
      <Signup show={showSignup} handleClose={() => setShowSignup(false)} />
      <PostAdForm show={showPost} handleClose={() => setShowPost(false)} />
    </>
  );
};

export default NavBar;  
